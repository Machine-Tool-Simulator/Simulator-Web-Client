/**
 * Code for the control
 */

let videoCounter = -1;
let selectedCoord = 0;
let gotoSelected = 0;
let dooneSelected = 0;
let powerfeedSelected = 0;
let pressed = '';
let sequence = [];
let sequenceIdx = 0;
let gotoLimitx = 1000;
let gotoLimitz = 1000;
let gotoLimitNx = -1000;
let gotoLimitNz = -1000;
let finecoarse = 0.0025;
let spindleSpeed = 100;
let zOrigin = 0;
let xOrigin = 0;
let xzButtonsSelected = 0;
let delta = 0.025;
let home_position_x = 6;
let home_position_z = 5;

let xbutton = getById('Xbutton');
let zbutton = getById('Zbutton');

let powerfeedbutton = getById('f2btn');
let doonebutton = getById('f3btn');
let gotobutton = getById('f4btn');
let restorebutton = getById('f6btn');
let rpmbutton = getById('f7btn');
let toolretbutton = getById('f8btn');
let coarsespeedbutton = getById('FC');

let canSubmit = true;
let currentTasks = null;
let taskIndex = 0;
let xCoordinate = getById('xvar');
let zCoordinate = getById('zvar');

let GoTofunction = document.querySelectorAll("#f4btn, #f7btn, #Xbutton, #numButton, #AbsSet, #IncSet, #Zbutton"), i;

/** Initialization */
window.onload = function () {


    xbutton.addEventListener('click', function () {
        resetColors();
        xbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 1;
        xzButtonsSelected = 1;
        controlPressed("X");


    });

    zbutton.addEventListener('click', function () {
        resetColors();
        zbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 2;
        xzButtonsSelected = 1;
        controlPressed("Z");
    });

    powerfeedbutton.addEventListener('click', function () {
        resetColors();
        powerfeedbutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
        powerfeedSelected = 1;
        setfunctionbutton();
    });

    doonebutton.addEventListener('click', function () {
        resetColors();
        doonebutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
        document.getElementById('f1').value = 'TAPER';
        document.getElementById('f2').value = 'RADIUS';
        document.getElementById('f3').value = 'FILLET';
        document.getElementById('f4').value = '';
        document.getElementById('f5').value = 'THREAD REPAIR';
        document.getElementById('f6').value = '';
        document.getElementById('f7').value = '';
        document.getElementById('f8').value = 'RETURN';
        dooneSelected = 1;
    });

    gotobutton.addEventListener('click', function () {
        resetColors();
        setfunctionbutton();
        gotoSelected = 1;
        gotobutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;

    });

    rpmbutton.addEventListener('click', function () {
        resetColors();
        rpmbutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 3;
        setfunctionbutton();
    });

    toolretbutton.addEventListener('click', function () {
        if (videoCounter === 11) { // Only do this if on the tool index
            resetColors();
            toolretbutton.style.backgroundColor = 'rgb(135,206,250)';
            selectedCoord = 0;
        }
        console.log("return clicked")


        if (document.getElementById('f8').value == 'RETURN') {
            resetfunctionbutton();
            console.log("F8 return clicked")
        } else {
            setfunctionbutton();
        }
    });

    // When value entered, want to exit that button's mode
    restorebutton.addEventListener('click', function () {
        resetColors();

    });

    coarsespeedbutton.addEventListener('click', function () {
        if (coarsespeedbutton.value == 'F') {
            coarsespeedbutton.value = 'C'
            delta = 0.025*4;
        } else if (coarsespeedbutton.value == 'C') {
            coarsespeedbutton.value = 'F'
            delta = 0.025;
        } else {
            coarsespeedbutton.value = 'F'
        }
    });

    // for the hamburger bar implementation

  	// hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });

}

function setfunctionbutton() {
    document.getElementById('f1').value = '';
    document.getElementById('f2').value = '';
    document.getElementById('f3').value = '';
    document.getElementById('f4').value = '';
    document.getElementById('f5').value = '';
    document.getElementById('f6').value = '';
    document.getElementById('f7').value = '';
    document.getElementById('f8').value = 'RETURN';
}

function resetfunctionbutton() {
    console.log("reset called")
    document.getElementById('f1').value = '';
    document.getElementById('f2').value = 'POWER FEED';
    document.getElementById('f3').value = 'DO ONE';
    document.getElementById('f4').value = 'GO TO';
    document.getElementById('f5').value = 'MAX RPM';
    document.getElementById('f6').value = 'RETURN HOME';
    document.getElementById('f7').value = 'SPIN SPEED';
    document.getElementById('f8').value = 'TOOL #';
    gotoSelected = 0;
    dooneSelected = 0;
    powerfeedSelected = 0;
    sequence = [];
    sequenceIdx = 0;
    pressed = "";
    gotoLimitx = 1000;
    gotoLimitz = 1000;
    gotoLimitNx = -1000;
    gotoLimitNz = -1000;

}


function resetColors() {
    xbutton.style.backgroundColor = 'rgb(236,210,175)';
    zbutton.style.backgroundColor = 'rgb(85,80,74)';
    powerfeedbutton.style.backgroundColor = '';
    doonebutton.style.backgroundColor = '';
    gotobutton.style.backgroundColor = '';
    rpmbutton.style.backgroundColor = '';
    toolretbutton.style.backgroundColor = '';

}

/** Console controls */
function controlPressed(value) {
    completeTask(value);
}

function numberPressed(element) {
    completeTask(element.value);
    getById('buffer').value = addNumber(buffer.value, element.value);
}

function addNumber(current, digit) {
    if (digit === '.' && current.indexOf(digit) >= 0) return current;
    if (current === '0') {
        if (digit === '0') return current;
        if (digit === '.') return current + digit;
        else return digit;
    }
    if (digit === '+/-') {
        if (current.length <= 0) return current;
        if (current.charAt(0) === '-') current = current.substring(1);
        else current = '-' + current;
        return current;
    }

    return current + digit;
}

function setAbsPos() {
    completeTask('ABS_SET');

    // Resetting button colors
    resetColors();
    //gotoSelected != 1 && dooneSelected != 1 && powerfeedSelected != 1
    if (gotoSelected != 1 && dooneSelected != 1 && powerfeedSelected != 1 && xzButtonsSelected != 1) {
        resetfunctionbutton();
    }

    let buffer = getById('buffer');
    if (buffer.value.length <= 0) return;

    if (selectedCoord == 0) {
        buffer.value = '';
        return;
    }
    let targetVar;
    if (selectedCoord == 1) targetVar = getById('xvar');
    else if (selectedCoord == 2) targetVar = getById('zvar');
    else if (selectedCoord == 3) targetVar = getById('rpm');

    targetVar.value = buffer.value;
    buffer.value = '';

    selectedCoord = 0;
}

function setIncPos() {
    completeTask('INC_SET');

    // Resetting button colors
    resetColors();
    //resetfunctionbutton();

    let buffer = getById('buffer');
    if (buffer.value.length <= 0) return;

    if (selectedCoord == 0) {
        buffer.value = '';
        return;
    }
    let targetVar;
    if (selectedCoord == 1) targetVar = getById('xvar');
    else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values
    else if (selectedCoord == 3){
      targetVar = getById('rpm');
      spindleSpeed = parseFloat(buffer.value);
    }

    if (targetVar.value.length <= 0) targetVar.value = 0;
    targetVar.value = parseFloat(buffer.value); // Do not want to add these, but if did: parseFloat(targetVar.value) +
    buffer.value = '';

    selectedCoord = 0;
}

function restore() {
    // Resetting button colors
    resetColors();

    let buffer = getById('buffer');

    // if (selectedCoord == 0) return; // Still need to reset value in buffer if necessary
    let targetVar;
    if (selectedCoord == 1) targetVar = getById('xvar');
    else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values
    else if (selectedCoord == 3) targetVar = getById('rpm');

    buffer.value = '';
    targetVar.value = '';

    selectedCoord = 0;
}

function spindle(element) {
    completeTask(element.value);
}

function ChangeVideoMainLatheFeatures() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter = 1;
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }
}

function ChangeDigitalReadout() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter = 2;
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }
}

function ChangeSpindle() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter = 3;
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }
}

function ChangeConstantRPM() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter = 4;
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }
}

function ChangeConstantSFM() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter = 5;
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }
}


function switchVideo(action) {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (action === 'next') {
        if (videoCounter >= videos.length) {	// end of videos
            title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
            player.style.display = "none";
            description.innerHTML = "";
            return;
        }
        // TODO: end of videos stuff

        if (currentTasks) {
            alert('Have uncompleted tasks');	// bad practice
            return;	// task not finished
        }

        if (videoCounter++ == -1) {
            getById('cover').style.display = 'none';
            player.style.display = 'block';
        }

        let video = videos[videoCounter];
        title.innerHTML = video.title;
        player.src = video.src;
        description.innerHTML = video.text;

        if (video.tasks) {
            currentTasks = video.tasks;
        }
    } else if (action === 'back') {
        if (videoCounter > 0) {        // defaulted to -1
            videoCounter--;
            let video = videos[videoCounter];
            title.innerHTML = video.title;
            player.src = video.src;
            description.innerHTML = video.text;
            currentTasks = null;
        }
    }
}

function backCoverPage() {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (videoCounter >= videos.length) {	// end of videos
        title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
        player.style.display = "none";
        description.innerHTML = "";
        return;
    }
    // TODO: if end of videos, submit a feedback to server
    currentTasks = null
    // if (currentTasks) {
    //     alert('Have uncompleted tasks');	// bad practice
    //     return;	// task not finished
    // }
    if (videoCounter > 0) {
        videoCounter -= 1
    }

    console.log("Now the videoCounter is: ", videoCounter)
    if (videoCounter == 0) {
        getById('cover').style.display = 'flex';
        player.style.display = 'block';
    } else {
      let video = videos[videoCounter];
      console.log("Now the video is: ", video)
      title.innerHTML = video.title;
      player.src = video.src;
      description.innerHTML = video.text;

      // if (video.tasks) {
      //     currentTasks = video.tasks;
      // }
    }

}

function nextTask() {
    taskIndex++;
    if (taskIndex >= currentTasks.length) {
        taskIndex = 0;
        currentTasks = null;		// meaning can submit
    }
}

function completeTask(value) {
    if (!currentTasks) return;	// no current tasks

    let task = currentTasks[taskIndex];
    if (task.press) {
        if (task.press === value) {
            if (task.conditions) {
                if (task.conditions.buffer) {
                    if (task.conditions.buffer != getById('buffer').value) return;
                }
                // if (more task.conditions...)
            }
            console.log("Step completed!");
            nextTask();
            console.log(currentTasks);
            console.log(taskIndex);
        }
    }
    else if (task.shape) { // If shape
        console.log("in here");

        let i = 0;
        let j = 0;

        // console.log(lathe_pts);
        // console.log(task.shape);

        while (j < lathe_pts.length) {
            // console.log(lathe_pts[j].x);
            // console.log(task.shape[i].x);

            // Calls function to check each of points to determine if right shape cut out
            if (compareCoords(lathe_pts[j], task.shape[i])) { // If pts match, continue
                i++;
            }
            j++;
        }

        console.log("i: " + i + " | j: " + j);

        // Determines if right shape has been cut out
        if (i === task.shape.length) {
            console.log("Step completed!");
            nextTask();
            console.log(currentTasks);
            console.log(taskIndex);
        }
    }
    // else if (task.click) { // If want to check certain shapes clicked
    //
    // }
}

// Function to check points between lathe object and true shape from lathe.js file
// to determine if the user has cut out the right file
// function compareCoords(obj1, obj2) {
//     return obj1.x === obj2.x && obj1.y === obj2.y && obj1.z === obj2.z;
// }
var tolerance = .2; // Tolerance for how different the cut out shape can be from the true version (in lathe.js)
function compareCoords(obj1, obj2) {
    return Math.abs(obj1.x - obj2.x) < tolerance && Math.abs(obj1.y - obj2.y) < tolerance && Math.abs(obj1.z - obj2.z) < tolerance;
}

function negBuffer() {
    let buffer = getById('buffer');

    buffer.value = -buffer.value;
}

/** Helpers */
function getById(id) {
    return document.getElementById(id);
}
