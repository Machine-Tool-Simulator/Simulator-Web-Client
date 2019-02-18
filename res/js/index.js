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
let spindleSpeed = 100;
let xzButtonsSelected = 0;
let stopObserver = 0;
let spindleSpeedSelected = 0;


let xbutton = getById('Xbutton');
let zbutton = getById('Zbutton');

let powerfeedbutton = getById('f2btn');
let doonebutton = getById('f3btn');
let gotobutton = getById('f4btn');
let restorebutton = getById('f6btn');
let rpmbutton = getById('f7btn');
let toolretbutton = getById('f8btn');
let coarsespeedbutton = getById('FC');
let taperbutton = getById('f1btn');


let currentTasks = null;
let jsonIdx = 0;
let taskIndex = 0;
let xCoordinate = getById('xvar');
let zCoordinate = getById('zvar');

let GoTofunction = document.querySelectorAll("#f1btn, #f3btn, #f4btn, #f6btn,#f7btn, #Xbutton, #numButton, #AbsSet, #IncSet, #Zbutton,#GO"), i;

let pageHead = -1;    // Records pages where user has gone past before (Tasks done)
let userId = undefined; // User ID

/** Initialization */
window.onload = function () {

    if (mobileOS()) {
        getById('hamburger').style.visibility = 'hidden';
    }

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

    taperbutton.addEventListener('click', function () {
        resetColors();
        if (dooneSelected == 1) {
            buffer.value = '45';
            setfunctionbutton();
        }
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
        spindleSpeedSelected = 1;
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
        setfunctionbutton();

    });

    coarsespeedbutton.addEventListener('click', function () {
        if (coarsespeedbutton.value == 'F') {
            coarsespeedbutton.value = 'C'
            delta = 0.025 * 6;
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
    buffer.value = '';
    gotoSelected = 0;
    dooneSelected = 0;
    powerfeedSelected = 0;
    spindleSpeedSelected = 0;
    sequence = [];
    sequenceIdx = 0;
    pressed = "";
    gotoLimitx = 1000;
    gotoLimitz = 1000;
    gotoLimitNx = -1000;
    gotoLimitNz = -1000;
    scene.stopAnimation(box);
    stopObserver = 1;
    XGoTo = 0;
    ZGoTo = 0;
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
        if (current.length <= 0) {
            return '-0';
        }
        if (current.charAt(0) === '-') current = current.substring(1);
        else current = '-' + current;
        return current;
    }
    if (current === '-0' && digit !== '.') {
        return '-' + digit;
    }

    return current + digit;
}

function setAbsPos() {
    completeTask('ABS_SET');

    // Resetting button colors
    resetColors();
    //gotoSelected != 1 && dooneSelected != 1 && powerfeedSelected != 1
    if (gotoSelected != 1 && dooneSelected != 1 && powerfeedSelected != 1 && xzButtonsSelected != 1 && spindleSpeedSelected != 1) {
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
    else if (selectedCoord == 3) {
        targetVar = getById('rpm');
        spindleSpeed = parseFloat(buffer.value);
    }

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
    else if (selectedCoord == 3) {
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

//===============================================================================================================================================================================
function switchVideo(action) {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');
    let todo = getById('todo');

    if (action === 'next') {
        // prompt for user id
        // if (!userId) userId = prompt('Please enter your ID (same as used on previous page)');
        // if (!userId) {
        //     return;
        // }
        // userBegin(userId);

        if (videoCounter >= videos.length) {	// end of videos
            title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
            player.style.display = "none";
            description.innerHTML = "";
            todo.innerHTML = "";
            return;
        }

        if (currentTasks) {
            let task = currentTasks[taskIndex];
            if (task.coord) {
                if (Math.abs(xCoordinate.value * 10 - task.coord.x) > 0.1 || Math.abs(zCoordinate.value * 10 - task.coord.z) > 0.1) {
                    alert('Have uncompleted tasks');	// bad practice
                    return;	// task not finished
                }
            } else {
                alert('Have uncompleted tasks');	// bad practice
                return;	// task not finished
            }
        }

        pageHead = Math.max(videoCounter, pageHead);

        if (videoCounter++ == -1) { // currently on intro page, hide everything that's not used in other pages
            getById('cover').style.display = 'none';
            player.style.display = 'block';
        }

        let video = videos[videoCounter];
        title.innerHTML = video.title;
        if (video.src) {
            player.style.display = 'block';
            player.src = video.src;
        } else {
            player.style.display = 'none';
            player.src = null;
        }
        description.innerHTML = video.text;
        if (video.todo) {
            todo.innerHTML = video.todo;
        } else {
            todo.innerHTML = "";
        }

        if (pageHead < videoCounter && video.tasks) {    // tasks have not been completed yet
            currentTasks = video.tasks;
            taskIndex = 0;
            jsonIdx = video.index;
        }
    } else if (action === 'back') {
        if (videoCounter > 0) {        // defaulted to -1
            videoCounter--;
            let video = videos[videoCounter];
            title.innerHTML = video.title;
            player.src = video.src;
            description.innerHTML = video.text;
            console.log(video);
            if (video.todo) {
                todo.innerHTML = video.todo;
            } else {
                todo.innerHTML = "";
            }
            currentTasks = null;
            taskIndex = 0;
        }
    }

    if (videoCounter === 11 || videoCounter === 12) {
        reset();
    }
    else if (videoCounter === 2 || videoCounter === 4) {
        Chuck1.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
        tailstock.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
        toolpost.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
        box.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);
    }
    else if (videoCounter === 13) { // this corresponds to the 14th index for the first goto video
        reset(); // reset the shape
        depth_set = 1;
    }
    else if (videoCounter === 14) {
        reset(); // reset the shape
        depth_set = 3;
    }

    // if (videoCounter === videos.length - 1) {
    //     sendReport();
    // }
}

function PlaylistVideo(action) {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');
    let todo = getById('todo');

    if (pageHead >= action) {
        videoCounter = action;
    } else {
        alert('Can\'t jump to the next task unless you finish all the previous ones');
        return;
    }

    let video = videos[videoCounter];
    title.innerHTML = video.title;
    player.src = video.src;
    description.innerHTML = video.text;
    if (video.todo) {
        todo.innerHTML = video.todo;
    } else {
        todo.innerHTML = "";
    }

    if (video.tasks && action <= pageHead) {
        currentTasks = video.tasks;
    } else {
        currentTasks = null;
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
            console.log(`Current tasks: ${currentTasks}`);
            console.log(`Task index: ${taskIndex}`);
        }
    }
    else if (task.position) {
        if (value != null) {
            if (jsonIdx == 13) {
                if (value[0] <= task.position[0] && value[1] <= task.position[1]) {
                    console.log("Step completed!");
                    nextTask();
                }
            }
            else {
                console.log("Enter task..")
                if ((task.position[0] - 0.5 <= value[0] && value[0] <= task.position[0] + 0.5) && (task.position[1] - 0.5 <= value[1] && value[1] <= task.position[1] + 0.5)) {
                    console.log("Step completed!");
                    nextTask();
                }
            }
        }
    }
    else if (task.shape) { // If shape
        let i = 0;
        let j = 0;

        while (j < lathe_pts.length) {
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
            console.log(`Current tasks: ${currentTasks}`);
            console.log(`Task index: ${taskIndex}`);
        }
    } else if (task.click) { // If want to check certain shapes clicked
        if (value === task.click) {
            console.log("Step completed!");
            nextTask();
            console.log(`Current tasks: ${currentTasks}`);
            console.log(`Task index: ${taskIndex}`);
        }
    }
}

function skipTask() {
    console.log('Skip');
    currentTasks = null;
    switchVideo('next');
}

function openSidebar() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function closeSidebar() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}




// Function to check points between lathe object and true shape from lathe.js file
// to determine if the user has cut out the right file
// function compareCoords(obj1, obj2) {
//     return obj1.x === obj2.x && obj1.y === obj2.y && obj1.z === obj2.z;
// }
var tolerance = .3; // Tolerance for how different the cut out shape can be from the true version (in lathe.js)
function compareCoords(obj1, obj2) {
    return Math.abs(obj1.x - obj2.x) < tolerance && Math.abs(obj1.y - obj2.y) < tolerance && Math.abs(obj1.z - obj2.z) < tolerance;
}

/** Helpers */
function getById(id) {
    return document.getElementById(id);
}

function mobileOS() {
    var useragent = navigator.userAgent;

    if (useragent.match(/Android/i)) {
        return 'android';
    } else if (useragent.match(/webOS/i)) {
        return 'webos';
    } else if (useragent.match(/iPhone/i)) {
        return 'iphone';
    } else if (useragent.match(/iPod/i)) {
        return 'ipod';
    } else if (useragent.match(/iPad/i)) {
        return 'ipad';
    } else if (useragent.match(/Windows Phone/i)) {
        return 'windows phone';
    } else if (useragent.match(/SymbianOS/i)) {
        return 'symbian';
    } else if (useragent.match(/RIM/i) || useragent.match(/BB/i)) {
        return 'blackberry';
    } else {
        return false;
    }
}
