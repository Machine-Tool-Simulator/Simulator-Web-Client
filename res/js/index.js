let videoCounter = 0;
let selectedCoord = 0;
let gotoSelected = 0;
let dooneSelected = 0;
let powerfeedSelected = 0;
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

/** Initialization */
window.onload = function() {
	xbutton.addEventListener('click', function() {
        resetColors();
		xbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 1;
        controlPressed("X");
	});

	zbutton.addEventListener('click', function() {
        resetColors();
		zbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 2;
        controlPressed("Z");
	});

    powerfeedbutton.addEventListener('click', function() {
        resetColors();
        powerfeedbutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
				powerfeedSelected =1;
				setfuncitonbutton();
    });

    doonebutton.addEventListener('click', function() {
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

    gotobutton.addEventListener('click', function() {
        resetColors();
				setfuncitonbutton();
				gotoSelected = 1;
        gotobutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
    });

    rpmbutton.addEventListener('click', function() {
        resetColors();
        rpmbutton.style.backgroundColor = 'rgb(135,206,250)';
		selectedCoord = 3;
				setfuncitonbutton();
	});

    toolretbutton.addEventListener('click', function() {
    	if (videoCounter === 11) { // Only do this if on the tool index
            resetColors();
            toolretbutton.style.backgroundColor = 'rgb(135,206,250)';
            selectedCoord = 0;
					}


			if (document.getElementById('f8').value == 'RETURN'){
					resetfunctionbutton();
			}
			else{
					setfuncitonbutton();
			}


    });

	// When value entered, want to exit that button's mode
    restorebutton.addEventListener('click', function() {
        resetColors();
    });

		coarsespeedbutton.addEventListener('click', function() {
				if (coarsespeedbutton.value == 'F'){
						coarsespeedbutton.value = 'C'
				}
				else if (coarsespeedbutton.value == 'C') {
						coarsespeedbutton.value = 'F'

				}
				else{
						coarsespeedbutton.value = 'F'
				}
		});

}

function setfuncitonbutton(){
	document.getElementById('f1').value = '';
	document.getElementById('f2').value = '';
	document.getElementById('f3').value = '';
	document.getElementById('f4').value = '';
	document.getElementById('f5').value = '';
	document.getElementById('f6').value = '';
	document.getElementById('f7').value = '';
	document.getElementById('f8').value = 'RETURN';
}

function resetfunctionbutton(){
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

function numberPressed(element){
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
		if (gotoSelected!=1 || dooneSelected!=1 || powerfeedSelected !=1){
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
		resetfunctionbutton();

	let buffer = getById('buffer');
	if (buffer.value.length <= 0) return;

	if (selectedCoord == 0) {
        buffer.value = '';
		return;
    }
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values
    else if (selectedCoord == 3) targetVar = getById('rpm');

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

/** TODO: move essence to server */
function switchVideo() {
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

	if (currentTasks) {
		alert('Have uncompleted tasks');	// bad practice
		return;	// task not finished
	}

	if (videoCounter++ == 0) {
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
}

function negBuffer() {
    let buffer = getById('buffer');

	buffer.value = -buffer.value;
}

/** Helpers */
function getById(id) {
	return document.getElementById(id);
}

 // ** For the timer */

document.getElementById('timer').innerHTML = 20 + ":" + 05;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
