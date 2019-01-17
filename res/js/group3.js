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
window.onload = () => {
    getById('player').style.display = 'none';
}

//===============================================================================================================================================================================
function switchVideo(action) {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (action === 'next') {
        // prompt for user id
        if (!userId) userId = prompt('Please enter your ID (same as used on previous page)');
        if (!userId) {
            return;
        }

        if (videoCounter >= videos.length) {	// end of videos
            title.innerHTML = "You are done!\nRefresh the page and practice each again until you are comfortable with each.";
            player.style.display = "none";
            description.innerHTML = "";
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
            currentTasks = null;
            taskIndex = 0;
        }
    }

    if (videoCounter === 11 || videoCounter === 12) {
        reset();
    }
    if (videoCounter === 13) { // this corresponds to the 14th index for the first goto video
        reset(); // reset the shape
        depth_set = 1;
    }
    else if (videoCounter === 14) {
        reset(); // reset the shape
        depth_set = 3;
    }

    if (videoCounter === videos.length - 1) {
        sendReport();
    }
}

function PlaylistVideo(action) {
    let title = getById('title');
    let player = getById('player');
    let description = getById('description');

    if (pageHead > action) {
        videoCounter = action;
    } else {
        alert('Can\'t jump to the next task unless you finish all the previous ones');
        return;
    }

    let video = videos[videoCounter];
    title.innerHTML = video.title;
    player.src = video.src;
    description.innerHTML = video.text;

    if (video.tasks && action <= pageHead) {
        currentTasks = video.tasks;
    } else {
        currentTasks = null;
    }
}

/** Helpers */
function getById(id) {
    return document.getElementById(id);
}
