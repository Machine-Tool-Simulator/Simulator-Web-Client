

var xbutton = document.getElementById("Xbutton");
var zbutton = document.getElementById("Zbutton");
var selectedCoord = 0;
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
	let buffer = document.getElementById('coord-buffer');
	buffer.value = addNumber(buffer.value, element.value);
}

function addNumber(current, digit) {
	// TODO: actually add the calculator function
	return current + digit;
}

function setAbsPos(element) {
	let buffer = document.getElementById('coord-buffer');
	if (selectedCoord == 1) {
		let xvar = document.getElementById('xvar');
		console.log(xvar);
		if (element.value === "RESTORE"){
			xvar.value = "";
		}
		else{
			if (buffer.value.length <= 0) return;
			xvar.value = buffer.value;
			buffer.value = "";
		}
	}
	else if (selectedCoord == 2) {
		let zvar = document.getElementById('zvar');
		if (element.value === "RESTORE"){
			zvar.value = "";
		}
		else{
			if (buffer.value.length <= 0) return;
			zvar.value = buffer.value;
			buffer.value = "";
		}
	}
}
