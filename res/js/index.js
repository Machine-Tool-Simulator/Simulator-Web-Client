let videoCounter = 0;
let selectedCoord = 0;
let xbutton = getById("Xbutton");
let zbutton = getById("Zbutton");

/** Initialization */
window.onload = function() {
	xbutton.addEventListener("click", function() {
		selectedCoord = 1;
		xbutton.style.backgroundColor = "rgb(0,0,0)";
		zbutton.style.backgroundColor = "rgb(85,80,74)";
	});
	
	zbutton.addEventListener("click", function() {
		selectedCoord = 2;
		zbutton.style.backgroundColor = "rgb(0,0,0)";
		xbutton.style.backgroundColor = "rgb(236,210,175)";
	});
}

/** Console controls */
function numberPressed(element){
	getById('buffer').value = addNumber(buffer.value, element.value);
}

function addNumber(current, digit) {
	// TODO: actually add the calculator function
	return current + digit;
}

function setAbsPos() {
	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');

	let buffer = getById('buffer');
	targetVar.value = buffer.value;
	buffer.value = "";
}

function setIncPos() {
	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values

	let buffer = getById('buffer');
	if (buffer.value.length <= 0) return;
	if (targetVar.value.length <= 0) targetVar.value = 0;
	targetVar.value = parseFloat(targetVar.value) + parseFloat(buffer.value);
	buffer.value = "";
}

function restore() {
	if (selectedCoord == 0) return;
	let targetVar;
	if (selectedCoord == 1) targetVar = getById('xvar');
	else if (selectedCoord == 2) targetVar = getById('zvar');	// not using else here in case of other weird values

	targetVar.value = "";
}

function switchVideo(element) {
	videoCounter += 1;
	let video_1 = getById("videoList_1");
	let video_2 = getById("videoList_2");
	let video_3 = getById("videoList_3");
	let video_4 = getById("videoList_4");
	let video_5 = getById("videoList_5");
	let video_end = getById("videoList_end");

	if (videoCounter == 1) {
		video_1.style.display = "block";
	} else if (videoCounter == 2) {
		video_2.style.display = "block";
		video_1.style.display = "none"
	} else if (videoCounter == 3) {
		video_3.style.display = "block";
		video_2.style.display = "none"
	} else if (videoCounter == 4) {
		video_4.style.display = "block";
		video_3.style.display = "none";
	} else if (videoCounter == 5) {
		video_5.style.display = "block";
		video_4.style.display = "none";

	} else if (videoCounter == 6) {
		video_end.style.display = "block";
		video_5.style.display = "none";
	}
}

/** Helpers */
function getById(id) {
	return document.getElementById(id);
}