let time = new Array(videos.length).fill(0);
let hasSentReport = false;

window.setInterval(() => {
    if (videoCounter >= 0 && videoCounter < videos.length - 1) { // neither intro nor conclusion
        time[videoCounter]++;
    }
}, 1000);

function sendReport() {
    if (hasSentReport) return;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", SERVER_URL + RT_SUBMIT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    	id: userId,
    	results: time,
    }));

    hasSentReport = true;
}

function userBegin(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", SERVER_URL + RT_BEGIN, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: id,
    }));
}