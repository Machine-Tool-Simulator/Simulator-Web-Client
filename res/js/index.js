function jump() {
	let id = document.getElementById('user-id').value;
	console.log(id);
	if (id % 3 == 0) {
		window.location.href = 'group1.html';
	} else if (id % 3 == 1) {
		window.location.href = 'group2.html';
	} else { // id % 3 == 2
		window.location.href = 'group3.html';
	}
}