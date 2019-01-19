function jump() {
	let id = document.getElementById('user-id').value;
	console.log(id);
	if (id % 2 == 0) {
		window.location.href = 'group1.html';
	} else {
		window.location.href = 'group3.html';
	} 
}