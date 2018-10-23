

var xbutton = document.getElementById("Xbutton");
var zbutton = document.getElementById("Zbutton");
var buttonClickedv = 0;
xbutton.addEventListener("click", function() {
	buttonClicked = 1;
  xbutton.style.backgroundColor = "rgb(0,0,0)";
	zbutton.style.backgroundColor = "rgb(85,80,74)";
	console.log(buttonClicked);
});

zbutton.addEventListener("click", function() {
	buttonClicked = 2;
	zbutton.style.backgroundColor = "rgb(0,0,0)";
	xbutton.style.backgroundColor = "rgb(236,210,175)";
	console.log(buttonClicked);
});



function addNumber(element){
	if (buttonClicked == 1){
		if (element.value == "RESTORE"){
			document.getElementById('xvar').value = "";
		}
		else{
			document.getElementById('xvar').value = document.getElementById('xvar').value+element.value;
		}
	}
	else if (buttonClicked == 2) {
		if (element.value == "RESTORE"){
			document.getElementById('zvar').value = "";
		}
		else{
			document.getElementById('zvar').value = document.getElementById('zvar').value+element.value;
		}
	}
}
