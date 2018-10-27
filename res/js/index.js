let videoCounter = 0;
let selectedCoord = 0;
let xbutton = document.getElementById("Xbutton");
let zbutton = document.getElementById("Zbutton");

xbutton.addEventListener("click", function() {
	selectedCoord = 1;
	xbutton.style.backgroundColor = "rgb(0,0,0)";
	zbutton.style.backgroundColor = "rgb(85,80,74)";
	console.log("X coord");
});

zbutton.addEventListener("click", function() {
	selectedCoord = 2;
	zbutton.style.backgroundColor = "rgb(0,0,0)";
	xbutton.style.backgroundColor = "rgb(236,210,175)";
	console.log("Y coord");
});

function numberPressed(element){
	let buffer = document.getElementById('buffer');
	buffer.value = addNumber(buffer.value, element.value);
}

function addNumber(current, digit) {
	// TODO: actually add the calculator function
	return current + digit;
}

function setAbsPos(element) {
	let buffer = document.getElementById('buffer');
	if (selectedCoord == 1) {
		let xvar = document.getElementById('xvar');
		if (element.value === "RESTORE") {
			xvar.value = "";
		} else {
			if (buffer.value.length <= 0) return;
			xvar.value = buffer.value;
			buffer.value = "";
		}
	} else if (selectedCoord == 2) {
		let zvar = document.getElementById('zvar');
		if (element.value === "RESTORE") {
			zvar.value = "";
		} else {
			if (buffer.value.length <= 0) return;
			zvar.value = buffer.value;
			buffer.value = "";
		}
	}
}

function switchVideo(element) {
	videoCounter += 1;
	let video_1 = document.getElementById("videoList_1");
	let video_2 = document.getElementById("videoList_2");
	let video_3 = document.getElementById("videoList_3");
	let video_4 = document.getElementById("videoList_4");
	let video_5 = document.getElementById("videoList_5");
	let video_end = document.getElementById("videoList_end");

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
