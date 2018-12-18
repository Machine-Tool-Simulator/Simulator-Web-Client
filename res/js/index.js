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
let xCoordinate = getById('xvar');
let zCoordinate = getById('zvar');
let GoTofunction = document.querySelectorAll("#f4btn, #Xbutton, #numButton, #AbsSet, #Zbutton"), i;
/** Initialization */
window.onload = function () {
    xCoordinate.value = parseFloat(0);
    zCoordinate.value = parseFloat(0);

    xbutton.addEventListener('click', function () {
        resetColors();
        xbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 1;
        controlPressed("X");


    });

    zbutton.addEventListener('click', function () {
        resetColors();
        zbutton.style.backgroundColor = 'rgb(0,0,0)';
        selectedCoord = 2;
        controlPressed("Z");
    });

    powerfeedbutton.addEventListener('click', function () {
        resetColors();
        powerfeedbutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
        powerfeedSelected = 1;
        setfunctionbutton();
    });

    doonebutton.addEventListener('click', function () {
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

    gotobutton.addEventListener('click', function () {
        resetColors();
        setfunctionbutton();
        gotoSelected = 1;
        gotobutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 0;
    });

    rpmbutton.addEventListener('click', function () {
        resetColors();
        rpmbutton.style.backgroundColor = 'rgb(135,206,250)';
        selectedCoord = 3;
        setfunctionbutton();
    });

    toolretbutton.addEventListener('click', function () {
        if (videoCounter === 11) { // Only do this if on the tool index
            resetColors();
            toolretbutton.style.backgroundColor = 'rgb(135,206,250)';
            selectedCoord = 0;
        }
        console.log("return clicked")


        if (document.getElementById('f8').value == 'RETURN') {
            resetfunctionbutton();
            console.log("F8 return clicked")
        } else {
            setfunctionbutton();
        }


    });

    // When value entered, want to exit that button's mode
    restorebutton.addEventListener('click', function () {
        resetColors();
    });

    coarsespeedbutton.addEventListener('click', function () {
        if (coarsespeedbutton.value == 'F') {
            coarsespeedbutton.value = 'C'
        } else if (coarsespeedbutton.value == 'C') {
            coarsespeedbutton.value = 'F'

        } else {
            coarsespeedbutton.value = 'F'
        }
    });

}

function setfunctionbutton() {
    document.getElementById('f1').value = '';
    document.getElementById('f2').value = '';
    document.getElementById('f3').value = '';
    document.getElementById('f4').value = '';
    document.getElementById('f5').value = '';
    document.getElementById('f6').value = '';
    document.getElementById('f7').value = '';
    document.getElementById('f8').value = 'RETURN';
}

function resetfunctionbutton() {
    console.log("reset called")
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
    sequence = [];
    sequenceIdx = 0;
    pressed = "";
    gotoLimitx = 1000;
    gotoLimitz = 1000;
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

function numberPressed(element) {
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
    if (gotoSelected != 1 && dooneSelected != 1 && powerfeedSelected != 1) {
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
    // console.log(videoCounter);

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

    if (videoCounter++ == -1) {
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

/**
 * BabylonJS code
 */

var box;
var lathe;
var scene;
var lathe_pts;

var Mesh = BABYLON.Mesh; // Shortform for BABYLON.Mesh

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();


        box = BABYLON.Mesh.CreateBox("Box", 6, scene);
        box.position = new BABYLON.Vector3(6, -3, 5);

        lathe_pts = [
            // new BABYLON.Vector3(4, 0, 0),
            new BABYLON.Vector3(2, 0, 0),
            new BABYLON.Vector3(2, 8, 0), // to check pts along lathe
            new BABYLON.Vector3(4, 8, 0),
            new BABYLON.Vector3(4, 16, 0),
        ];

// console.log(lathe_pts);

        lathe = BABYLON.MeshBuilder.CreateLathe("lathe", {
            shape: lathe_pts,
            cap: Mesh.CAP_ALL,
            updateable: true
        }, scene);
        lathe.rotation.x = -Math.PI / 2;

        var chuck = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 3, diameter: 30}, scene);
        chuck.position = new BABYLON.Vector3(0, 0, -17);
        // chuck.setPivotPoint(new BABYLON.Vector3(0,-6,0));
        chuck.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);

        // Setting chuck material
        var metal = new BABYLON.StandardMaterial("grass0", scene);
        metal.diffuseTexture = new BABYLON.Texture("res/textures/metal.jpg", scene);
        chuck.material = metal;

// light
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-1, -1, -1), scene);
        light.position = new BABYLON.Vector3(20, 40, 20);

// sphere for positioning properly
        var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
        lightSphere.position = light.position;
        lightSphere.material = new BABYLON.StandardMaterial("light", scene);
        lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

        light.intensity = 1;

        var material2 = new BABYLON.StandardMaterial("std", scene);
        material2.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);

        box.material = material2;

// Shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.getShadowMap().renderList.push(box);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.useKernelBlur = true;
        shadowGenerator.blurKernel = 64;

// Ground
        var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
        ground.position.y = -6;

        ground.receiveShadows = true;

        var camera = new BABYLON.ArcRotateCamera("arcCam",
            0,
            BABYLON.Tools.ToRadians(55),
            50, box.position, scene);
        camera.attachControl(canvas, true);

        // Keyboard events
        var clickedObject = 'box';
        console.log(clickedObject);
        box.actionManager = new BABYLON.ActionManager(scene);
        box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            clickedObject = 'box';
            console.log(clickedObject);
        }));

        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            // console.log("trigger");
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        var delta = .1;

// Game/Render loop
        scene.onBeforeRenderObservable.add(() => {
            if (inputMap["d"] || inputMap["ArrowRight"]) {
                lathe_engine(0, delta);
            }
            if (inputMap["w"] || inputMap["ArrowUp"]) {
                lathe_engine(-delta, 0);
            }
            if (inputMap["a"] || inputMap["ArrowLeft"]) {
                lathe_engine(0, -delta);
            }
            if (inputMap["s"] || inputMap["ArrowDown"]) {
                lathe_engine(delta, 0);
            }
        });

        BABYLON.SceneLoader.ImportMesh("", "", "res/models/untitled.babylon",
            scene, function (newMeshes) {
                wheel2 = newMeshes[0];
                wheel2.position = new BABYLON.Vector3(20, 1, 2.5);
                wheel2.rotation.y = Math.PI;
            });

        BABYLON.SceneLoader.ImportMesh("", "", "res/models/untitled.babylon",
            scene, function (newMeshes) {
                wheel = newMeshes[0];
                var startingPoint;
                var currentMesh;
                var dragInit;
                var dragDiff;
                var rotationInit;
                wheel.position = new BABYLON.Vector3(20, 1, 7.5);
                wheel.rotation.y = Math.PI;
                var getGroundPosition = function () {
                    // Use a predicate to get position on the ground
                    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                        return mesh == ground;
                    });
                    if (pickinfo.hit) {
                        return pickinfo.pickedPoint;
                    }

                    return null;
                }

                var onPointerDown = function (e) {
                    if (e.button !== 0) {
                        return;
                    }

                    if (parseInt(navigator.appVersion) > 3) {
                        var evt = e ? e : window.event;
                        dragInit = {x: evt.x, y: evt.y};
                        // check if we clicked on a mesh
                        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                            return mesh !== ground;
                        });
                        if (pickInfo.hit && (pickInfo.pickedMesh == wheel || pickInfo.pickedMesh == wheel2)) {
                            currentMesh = pickInfo.pickedMesh;
                            console.log(pickInfo.pickedMesh);
                            startingPoint = getGroundPosition(evt);
                            rotationInit = currentMesh.rotation.y;
                            if (startingPoint) { // we need to disconnect camera from canvas
                                setTimeout(function () {
                                    camera.detachControl(canvas)
                                }, 0);
                            }
                        }
                    }
                };

                // ----------------------------------------------------------------------------
                var onPointerUp = function (evt) {
                    if (startingPoint) {
                        camera.attachControl(canvas, true);
                        startingPoint = null;
                        return;
                    }
                }

                // ----------------------------------------------------------------------------
                var onPointerMove = function (evt) {
                    if (!startingPoint) {
                        return;
                    }
                    var current = getGroundPosition(evt);

                    if (!current) {
                        return;
                    }

                    dragDiff = {
                        x: evt.x - dragInit.x,
                        y: evt.y - dragInit.y
                    }

                    currentMeshX = currentMesh.rotation.x;
                    var newRotation = rotationInit - dragDiff.x / 170;
                    currentMesh.rotation.x = newRotation;
                    console.log(box.position);
                    console.log('box------------limitx')
                    console.log(gotoLimitx);
                    if (currentMesh.rotation.x > currentMeshX) {
                        if (currentMesh == wheel && box.position.x < gotoLimitx) {
                            box.position.x += 0.1;
                        } else if (currentMesh == wheel2) {
                            box.position.z -= 0.1;
                        }

                    } else if (currentMesh.rotation.x < currentMeshX) {
                        if (currentMesh == wheel) {
                            box.position.x -= 0.1;
                        } else if (currentMesh == wheel2 && box.position.z < gotoLimitz) {
                            box.position.z += 0.1;
                        }
                    }

                    return true;
                }
                // ----------------------------------------------------------------------------
                canvas.addEventListener("pointerdown", onPointerDown, false);
                canvas.addEventListener("pointerup", onPointerUp, false);
                canvas.addEventListener("pointermove", onPointerMove, false);

            });


        BABYLON.SceneLoader.ImportMesh("", "", "res/models/Tailstock.STL",
            scene, function (newMeshes) {
                tailstock = newMeshes[0];
                tailstock.position = new BABYLON.Vector3(-6,-7,29);
                tailstock.rotation.x = -Math.PI/2;
                var tailstock_scale = .05;
                tailstock.scaling.x = tailstock_scale;
                tailstock.scaling.y = tailstock_scale;
                tailstock.scaling.z = tailstock_scale;
            });

        var frameRate = 10;


        var yRot = new BABYLON.Animation("zRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keyFramesR = [];

        keyFramesR.push({
            frame: 0,
            value: 0
        });

        keyFramesR.push({
            frame: frameRate,
            value: 4 * Math.PI
        });

        keyFramesR.push({
            frame: 2 * frameRate,
            value: 8 * Math.PI
        });
        yRot.setKeys(keyFramesR);

        // TODO: Note there is a bug here where the sound keeps playing when press off if FWD is pressed twice
        var fwdOn = 0;
        var music = new BABYLON.Sound("FWDSound", "res/sounds/5959.mp3", scene, null, {loop: true, autoplay: false});
        document.getElementById("FWD").addEventListener("click", function () {
            scene.beginDirectAnimation(chuck, [yRot], 0, 2 * frameRate, true);
            music.play();
            fwdOn = 1;

        });

        document.getElementById("off").addEventListener("click", function () {
            scene.stopAnimation(chuck);
            music.stop();
            fwdOn = 0;
        });

// Implement GOTO;
        for (i = 0; i < GoTofunction.length; i++) {
            GoTofunction[i].addEventListener('click', function () {
                console.log('---------------');
                console.log(sequenceIdx - 1);
                console.log(sequence[sequenceIdx - 1]);
                if (this.id != sequence[sequenceIdx - 1]) {
                    sequence.push(this.id);
                    pressed += this.id;
                    sequenceIdx += 1;
                    console.log(sequence);
                }

                if (pressed == "f4btnXbuttonnumButtonAbsSetZbuttonnumButtonAbsSet"
                    || pressed == "f4btnZbuttonnumButtonAbsSetXbuttonnumButtonAbsSet") {
                    sequence = [];
                    sequenceIdx = 0;
                    var GoToXPosition = parseFloat(xCoordinate.value);
                    var GoToZPosition = parseFloat(zCoordinate.value);
                    gotoLimitx = GoToZPosition;
                    gotoLimitz = GoToXPosition;
                }
                console.log(pressed);
                // console.log(abSetPressed)
            }, false);

            //Implementation of Return Home funciton.
            document.getElementById("f6btn").addEventListener("click", function () {
                console.log("return home clicked");
                var frameRate1 = 10;
                var GoToAnimationX = new BABYLON.Animation('GotoAnimation', 'position.z', frameRate1, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                console.log(box.position.z);
                var keyFrames = [];
                keyFrames.push({
                    frame: 0,
                    value: box.position.z
                });

                keyFrames.push({
                    frame: 2 * frameRate1,
                    value: 0
                });

                var itHasStopped = function () {
                    //alert('itHasStopped func reports the animation stopped');
                    box.position.z = 0;
                    xCoordinate.value = parseFloat(box.position.z);
                }

                GoToAnimationX.setKeys(keyFrames);

                var GoToAnimationZ = new BABYLON.Animation('GotoAnimationZ', 'position.x', frameRate1, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                console.log(box.position.x);
                var keyFrames2 = [];
                keyFrames2.push({
                    frame: 0,
                    value: box.position.x
                });

                keyFrames2.push({
                    frame: 2 * frameRate1,
                    value: 0
                });

                var itHasStopped2 = function () {
                    box.position.x = 0;
                    zCoordinate.value = parseFloat(box.position.x);
                    scene.beginDirectAnimation(box, [GoToAnimationX], 0, 2 * frameRate, false, 1, itHasStopped);
                }

                GoToAnimationZ.setKeys(keyFrames2);

                box.animations.push(GoToAnimationZ);
                // var animatable = scene.beginAnimation(box, 0, 2 * frameRate1, false, 1, itHasStopped2);
                scene.beginDirectAnimation(box, [GoToAnimationZ], 0, 2 * frameRate, false, 1, itHasStopped2);


            });
        }

        return scene;
    }


    scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

});


/**
 * Code for making cutting tool movements in x and z directions
 */

function lathe_engine(delta_x, delta_z) {

    var x = box.position.x - 3;
    var z = box.position.z - 3;

    // If within range to cut and moving in the proper direction
    if (x < 4 && z < 0 && (delta_x < 0 || delta_z < 0)) {
        var abs_x = Math.abs(x);
        var abs_z = Math.abs(z);

        var max_x = -1000;
        var min_z = 1000;

        var pt_fnd = false;

        // Removing points that are cut off by box
        for (var i = 0; i < lathe_pts.length; i++) {
            var item = lathe_pts[i];

            if (item.x >= abs_x && item.y <= abs_z) {
                max_x = Math.max(max_x, item.x);
                min_z = Math.min(min_z, item.y);

                lathe_pts.splice(i, 1);
                i--;

                pt_fnd = true;
            }
        }

        // Only do these if need to cut out shape
        if (pt_fnd) {
            // Creating array of new points to splice in
            var new_pts = [
                new BABYLON.Vector3(abs_x, min_z, 0),
                new BABYLON.Vector3(abs_x, abs_z, 0),
                new BABYLON.Vector3(max_x, abs_z, 0),
            ];

            // Splicing in these pts and breaking when done
            for (var i = 0; i < lathe_pts.length; i++) {
                item = lathe_pts[i];
                if (item.x >= abs_x && item.y >= abs_z) {
                    lathe_pts.splice(i, 0, ...new_pts);
                    found = true;
                    break;
                }
            }

            // Rebuild lathe model based no new points
            lathe.dispose();
            lathe = BABYLON.MeshBuilder.CreateLathe("lathe", {
                shape: lathe_pts,
                cap: Mesh.CAP_ALL,
                updateable: true
            }, scene);
            lathe.rotation.x = -Math.PI / 2;

            // TODO: When move the x coordinate back, do not want to spew z points
            // console.log(lathe_pts);
        }
    }

    // These are set nicely to keep the box within a desired range
    if (x + delta_x >=-0.05) box.position.x += delta_x;
    if (z + delta_z >=-15.6) box.position.z += delta_z;

    // console.log(box.position.x + " | " + box.position.z);
}


/**
 * Code for the D3 wheels
 */

var r = 80;
var padding = 5;
var inset = .7;
var pos_wheel_2 = 200;
var y_pos = 10;
var spin_speed = 1;

var dragOne = d3.behavior.drag()
    .on('drag', dragOne);

var dragTwo = d3.behavior.drag()
    .on('drag', dragTwo);

var g = d3.select('svg')
    .attr({
        width: 370,
        height: 190
    })
    .append('g')
    .attr('transform', 'translate(' + (r + padding) + ',' + (r + padding) + ')');

g.append('circle')
    .attr({
        class: 'outer1',
        r: r,
        cy: y_pos
    });

g.append('circle')
    .attr({
        class: 'rotatable1',
        r: 15,
        cx: inset * r * Math.cos(0),
        cy: y_pos + inset * r * Math.sin(0),
    })
    .call(dragOne);

g.append('circle')
    .attr({
        class: 'outer2',
        r: r,
        cx: pos_wheel_2,
        cy: y_pos
    });

g.append('circle')
    .attr({
        class: 'rotatable2',
        r: 15,
        cx: pos_wheel_2 + inset * r * Math.cos(0),
        cy: y_pos + inset * r * Math.sin(0),
    })
    .call(dragTwo);

// store initial points
var xInit1 = d3.select('.rotatable1').attr('cx');
var yInit1 = d3.select('.rotatable1').attr('cy');

var xInit2 = d3.select('.rotatable2').attr('cx');
var yInit2 = d3.select('.rotatable2').attr('cy');


// reset location of rotatable circle
function reset() {
    d3.select('.rotatable1')
        .attr({
            cx: xInit1,
            cy: yInit1
        });

    d3.select('.rotatable2')
        .attr({
            cx: xInit2,
            cy: yInit2
        });

    rec.attr({
        x: rec_init_x,
        y: rec_init_y
    })
}


var rot_one = 0;
var rad_prev_one = 0;

function dragOne() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    if (rad_prev_one >= 2.7) {
        if (rad < -2.7) {
            if (rot_one === -1) rot_one = 0;
            else rot_one = rot_one !== 0 ? rot_one + 2 : rot_one + 1;
        }
    } else if (rad_prev_one <= -2.7) {
        if (rad > 2.7) {
            if (rot_one === 1) rot_one = 0;
            else rot_one = rot_one !== 0 ? rot_one - 2 : rot_one - 1;
        }
    }

    var rad_adj;

    if (rot_one > 0) rad_adj = Math.PI + rad;
    else if (rot_one < 0) rad_adj = rad - Math.PI;
    else rad_adj = rad;

    rad_prev_one = rad;


    d3.select(this)
        .attr({
            cx: inset * r * Math.cos(rad),
            cy: y_pos + inset * r * Math.sin(rad)
        });

    var rect_xfr = spin_speed * (rot_one * Math.PI + rad_adj);

    var calc = (rot_one * Math.PI + rad_adj);

    lathe_engine(0, -(box.position.z - rect_xfr)+5);

    // Updating value on control
    xCoordinate.value = parseFloat(box.position.z);

}

var rot_two = 0;
var rad_prev_two = 0;

function dragTwo() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x - pos_wheel_2;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    if (rad_prev_two >= 2.7) {
        if (rad < -2.7) {
            if (rot_two === -1) rot_two = 0;
            else rot_two = rot_two !== 0 ? rot_two + 2 : rot_two + 1;
        }
    } else if (rad_prev_two <= -2.7) {
        if (rad > 2.7) {
            if (rot_two === 1) rot_two = 0;
            else rot_two = rot_two !== 0 ? rot_two - 2 : rot_two - 1;
        }
    }

    var rad_adj;

    if (rot_two > 0) rad_adj = Math.PI + rad;
    else if (rot_two < 0) rad_adj = rad - Math.PI;
    else rad_adj = rad;

    rad_prev_two = rad;


    d3.select(this)
        .attr({
            cx: pos_wheel_2 + inset * r * Math.cos(rad),
            cy: y_pos + inset * r * Math.sin(rad)
        });

    var rect_xfr = -spin_speed * (rot_two * Math.PI + rad_adj);

    var calc = (rot_two * Math.PI + rad_adj);

    lathe_engine(-(box.position.x - rect_xfr)+6, 0);

    // Updating value on control
    zCoordinate.value = parseFloat(box.position.x);
}