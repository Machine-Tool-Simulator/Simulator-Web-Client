let videoCounter = 0;
let selectedCoord = 0;
let xbutton = getById('Xbutton');
let zbutton = getById('Zbutton');

let canSubmit = true;
let currentTasks = null;
let taskIndex = 0;

/** Initialization */
window.onload = function() {
	xbutton.addEventListener('click', function() {
		selectedCoord = 1;
		xbutton.style.backgroundColor = 'rgb(0,0,0)';
		zbutton.style.backgroundColor = 'rgb(85,80,74)';
	});
	
	zbutton.addEventListener('click', function() {
		selectedCoord = 2;
		zbutton.style.backgroundColor = 'rgb(0,0,0)';
		xbutton.style.backgroundColor = 'rgb(236,210,175)';
	});
}

/** Console controls */
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

	let buffer = getById('buffer');
	if (buffer.value.length <= 0) return;

	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');

	targetVar.value = buffer.value;
	buffer.value = '';
}

function setIncPos() {
	completeTask('INC_SET');

	let buffer = getById('buffer');
	if (buffer.value.length <= 0) return;

	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values

	if (targetVar.value.length <= 0) targetVar.value = 0;
	targetVar.value = parseFloat(targetVar.value) + parseFloat(buffer.value);
	buffer.value = '';
}

function restore() {
	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values

	targetVar.value = '';
}

/** TODO: move essence to server */
function switchVideo() {
	if (videoCounter >= videos.length) return;	// end of videos
	// TODO: if end of videos, submit a feedback to server

	if (currentTasks) {
		alert('Have uncompleted tasks');	// bad practice
		return;	// task not finished
	}

	let title = getById('title');
	let player = getById('player');
	let description = getById('description');
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
	if (taskIndex >= currentTask.length) {
		taskIndex = 0;
		currentTasks = null;		// meaning can submit
	}
}

function completeTask(value) {
	if (!currentTasks) return;	// no current tasks

	let task = currentTasks[taskIndex];
	if (task.press) {
		if (task.press === value) nextTask();
	}
}

/** Helpers */
function getById(id) {
	return document.getElementById(id);
}