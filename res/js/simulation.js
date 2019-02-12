let delta = 0.025; // how much box moves when command it to move
let xOrigin = 15; // x home position for cutting tool
let zOrigin = 3; // z home position for cutting tool
// let xOrigin = 15; // x home position for cutting tool
// let zOrigin = 1.9; // z home position for cutting tool
let box_size = 6; // length of one side of the box
let bound_limit_z = -15.6; // limit to how far box can go in the z direction
let bound_limit_x = -20; // limit to how far box can go in the x direction
let depth_set = 1;
let XGoTo = 0;
let ZGoTo = 0;


/**
 * BabylonJS code
 */

var box;
var lathe;
var scene;
var tailstock;
var Chuck1;
var fwdOn = 0;
var toolpost;

var lathe_pts_init = [
    new BABYLON.Vector3(4, 0, 0),
    new BABYLON.Vector3(4, 16, 0),
];
// var lathe_pts_init = [  // This shape is better if want to have a more obscure shape to begin with ...
//     new BABYLON.Vector3(2, 0, 0),
//     new BABYLON.Vector3(2, 8, 0), // to check pts along lathe
//     new BABYLON.Vector3(4, 8, 0),
//     new BABYLON.Vector3(4, 16, 0),
// ];
var lathe_pts = lathe_pts_init.slice(0);

var Mesh = BABYLON.Mesh; // Shortform for BABYLON.Mesh

var music; // need this external
var camera;

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();


        xCoordinate.value = (parseFloat(xOrigin)/10).toFixed(4);
        zCoordinate.value = (parseFloat(zOrigin)/10).toFixed(4);


        lathe = BABYLON.MeshBuilder.CreateLathe("lathe", {
            shape: lathe_pts,
            cap: Mesh.CAP_ALL,
            updateable: true
        }, scene);
        lathe.rotation.x = -Math.PI / 2;

        camera = new BABYLON.ArcRotateCamera("arcCam",
            0,
            BABYLON.Tools.ToRadians(50),
            50, new BABYLON.Vector3(xOrigin, -3, zOrigin), scene);
        camera.attachControl(canvas, true);

        BABYLON.SceneLoader.ImportMesh("", "", "res/models/cutting_tool.STL",
          scene, function (newMeshes) {
              box = newMeshes[0];

              box.position = new BABYLON.Vector3(xOrigin, -1.1, zOrigin);
              // box.rotation.y = Math.PI/2;
              box.rotation.z = Math.PI/2;
              box.rotation.x = -Math.PI/2;
              var Chuck2_scale = .1;
              box.scaling.x = Chuck2_scale*.9;
              box.scaling.y = Chuck2_scale*.9;
              box.scaling.z = Chuck2_scale*.9;// +0.14;
              console.log(box.position);

              box.actionManager = new BABYLON.ActionManager(scene);
              box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                  console.log('chuck clicked');
                  completeTask('chuck');
              }));

                var material = new BABYLON.StandardMaterial("std", scene);
                material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);

                box.material = material;

                camera.target = box;

                box.actionManager = new BABYLON.ActionManager(scene);
                box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                  if (jsonIdx == 4 && currentTasks[taskIndex].click == "box"){
                    box.material.diffuseColor = BABYLON.Color3.Green();
                    toolpost.material.diffuseColor = BABYLON.Color3.Green();
                    tailstock.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                    Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);

                  }
                  else if (jsonIdx == 4 && currentTasks[taskIndex].click != "box") {
                    box.material.diffuseColor = BABYLON.Color3.Red();
                    toolpost.material.diffuseColor = BABYLON.Color3.Red();
                    tailstock.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                    Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                  }
                    completeTask('box');
                }));
          });

          BABYLON.SceneLoader.ImportMesh("", "", "res/models/Toolpost.stl",
            scene, function (newMeshes) {
                toolpost = newMeshes[0];
                toolpost.position = new BABYLON.Vector3(xOrigin-3.9, -5, zOrigin+3.4);
                var toolpost_scale = .5;
                toolpost.scaling.x = toolpost_scale;
                toolpost.scaling.y = toolpost_scale;
                toolpost.scaling.z = toolpost_scale;

                  var material = new BABYLON.StandardMaterial("std", scene);
                  material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);

                  toolpost.material = material;

                toolpost.actionManager = new BABYLON.ActionManager(scene);
                  toolpost.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                    if (jsonIdx == 4 && currentTasks[taskIndex].click == "box"){
                      box.material.diffuseColor = BABYLON.Color3.Green();
                      toolpost.material.diffuseColor = BABYLON.Color3.Green();
                      tailstock.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                      Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                    }
                    else if (jsonIdx == 4 && currentTasks[taskIndex].click != "box") {
                      box.material.diffuseColor = BABYLON.Color3.Red();
                      toolpost.material.diffuseColor = BABYLON.Color3.Red();
                      tailstock.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                      Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                    }
                      completeTask('box');
                  }));
            });

        // Back of material that is in the chuck
        cyl = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 6.3, diameter: 8}, scene);
        cyl.position=new BABYLON.Vector3(0,0,-19.15);
        cyl.rotation.x=Math.PI/2;

// light
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-1, -1, -1), scene);
        light.position = new BABYLON.Vector3(50, 60, 40);

// sphere for positioning properly
        var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
        lightSphere.position = light.position;
        lightSphere.material = new BABYLON.StandardMaterial("light", scene);
        lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

        light.intensity = 1;



// Shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.getShadowMap().renderList.push(box);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.useKernelBlur = true;
        shadowGenerator.blurKernel = 64;

// Ground
        var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
        ground.position.y = -6;



        // Keyboard events


        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            // console.log("trigger");
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

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
                wheel2.position = new BABYLON.Vector3(28, 1, 2.5);
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
                wheel.position = new BABYLON.Vector3(28, 1, 7.5);
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

                    if (currentMesh.rotation.x > currentMeshX) {
                          if (currentMesh == wheel && xOrigin < gotoLimitx) {
                              lathe_engine(delta,0);
                          } else if (currentMesh == wheel2 && zOrigin > gotoLimitNz) {
                              lathe_engine(0,-delta);
                          }

                      } else if (currentMesh.rotation.x < currentMeshX) {
                          if (currentMesh == wheel && xOrigin > gotoLimitNx) {
                              lathe_engine(-delta,0);
                          } else if (currentMesh == wheel2 && zOrigin < gotoLimitz) {
                              lathe_engine(0,delta);
                          }
                      }
                    return true;
                }
                // ----------------------------------------------------------------------------
                canvas.addEventListener("pointerdown", onPointerDown, false);
                canvas.addEventListener("pointerup", onPointerUp, false);
                canvas.addEventListener("pointermove", onPointerMove, false);

            });


        BABYLON.SceneLoader.ImportMesh("", "", "res/models/Tailstock.stl",
            scene, function (newMeshes) {
                tailstock = newMeshes[0];
                tailstock.position = new BABYLON.Vector3(-6,-7,29);
                tailstock.rotation.x = -Math.PI/2;
                var tailstock_scale = .05;
                tailstock.scaling.x = tailstock_scale;
                tailstock.scaling.y = tailstock_scale;
                tailstock.scaling.z = tailstock_scale;

                tailstock.actionManager = new BABYLON.ActionManager(scene);
                tailstock.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                    if (jsonIdx == 4 && currentTasks[taskIndex].click == "tailstock"){
                      tailstock.material.diffuseColor = BABYLON.Color3.Green();
                      Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                      toolpost.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                      box.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);

                    }
                    else if (jsonIdx == 4 && currentTasks[taskIndex].click != "tailstock") {
                      tailstock.material.diffuseColor = BABYLON.Color3.Red();
                      Chuck1.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                      toolpost.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                      box.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);
                    }

                    console.log('tailstock clicked');
                    completeTask('tailstock');
                }));

                var material = new BABYLON.StandardMaterial("std", scene);
                //(0.75, 0.75, 0.75)
                material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);

                tailstock.material = material;
            });

            BABYLON.SceneLoader.ImportMesh("", "", "res/models/Chuck.stl",
                scene, function (newMeshes) {
                    Chuck1 = newMeshes[0];
                    Chuck1.position = new BABYLON.Vector3(0, 0, -22.3);
                    Chuck1.rotation.y = Math.PI/2;
                    var Chuck1_scale = .025;
                    Chuck1.scaling.x = Chuck1_scale;
                    Chuck1.scaling.y = Chuck1_scale;
                    Chuck1.scaling.z = Chuck1_scale;

                    Chuck1.actionManager = new BABYLON.ActionManager(scene);
                    Chuck1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                      if (jsonIdx == 4 && currentTasks[taskIndex].click == "chuck"){
                        Chuck1.material.diffuseColor = BABYLON.Color3.Green();
                        tailstock.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                        toolpost.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                        box.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);

                      }
                      else if (jsonIdx == 4 && currentTasks[taskIndex].click != "chuck") {
                        Chuck1.material.diffuseColor = BABYLON.Color3.Red();
                        tailstock.material.diffuseColor=new BABYLON.Color3(0.75, 0.75, 0.75);
                        toolpost.material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);
                        box.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.2);
                      }
                        console.log('chuck clicked');
                        completeTask('chuck');
                    }));

                    var material = new BABYLON.StandardMaterial("std", scene);
                    material.diffuseColor = new BABYLON.Color3(0.75, 0.75, 0.75);

                    Chuck1.material = material;
                });
          //  0, 0, -17

        var frameRate = 10;


        var yRot = new BABYLON.Animation("zRot", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

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

        music = new BABYLON.Sound("FWDSound", "res/sounds/lathe_sound_effect.mp3", scene, null, {loop: true, autoplay: false});
        document.getElementById("FWD").addEventListener("click", function () {
            if (fwdOn == 0){
              Chuck1.animations.push(yRot);
              var chuckAnim = scene.beginAnimation(Chuck1,0,2*frameRate,true,spindleSpeed*0.005);
              //console.log(Chuck1.position);
              music.play();
              fwdOn = 1;
            }
        });

        document.getElementById("off").addEventListener("click", function () {
            scene.stopAnimation(Chuck1);
            music.stop();
            fwdOn = 0;
        });


        for (i = 0; i < GoTofunction.length; i++) {
            GoTofunction[i].addEventListener('click', function () {

                if (this.id != sequence[sequenceIdx - 1]) {
                    sequence.push(this.id);
                    pressed += this.id;
                    sequenceIdx += 1;
                    console.log(sequence);
                }
                if (pressed == "f4btnXbuttonnumButtonAbsSet"){

                    var GoToXPosition = parseFloat(xCoordinate.value)*10;
                    XGoTo = 1;
                    if(GoToXPosition>xOrigin){
                      gotoLimitx = GoToXPosition;
                    }
                    else{
                      gotoLimitNx = GoToXPosition;
                    }
                }
                else if (pressed == "f4btnZbuttonnumButtonAbsSet") {
                    var GoToZPosition = parseFloat(zCoordinate.value)*10;
                    ZGoTo =1;
                    if(GoToZPosition>zOrigin){
                      gotoLimitz = GoToZPosition;
                    }
                    else{
                      gotoLimitNz = GoToZPosition;
                    }
                }
                //Implement GOTO;
                if (pressed == "f4btnXbuttonnumButtonAbsSetZbuttonnumButtonAbsSet"
                    || pressed == "f4btnZbuttonnumButtonAbsSetXbuttonnumButtonAbsSet") {
                    sequence = [];
                    sequenceIdx = 0;
                    var GoToXPosition = parseFloat(xCoordinate.value)*10;
                    var GoToZPosition = parseFloat(zCoordinate.value)*10;

                    if(GoToZPosition>zOrigin && ZGoTo == 0){
                      gotoLimitz = GoToZPosition;
                    }
                    else if (GoToZPosition<=zOrigin && ZGoTo == 0){
                      gotoLimitNz = GoToZPosition;
                    }

                    if(GoToXPosition>xOrigin && XGoTo == 0){
                      gotoLimitx = GoToXPosition;
                    }
                    else if (GoToXPosition<=xOrigin && XGoTo == 0){
                      gotoLimitNx = GoToXPosition;
                    }

                }
                //spindle speed: constant rpm
                else if(pressed == "f7btnnumButtonIncSet" || pressed == "f7btnnumButtonAbsSet"){
                  if (fwdOn == 1){
                    scene.stopAnimation(Chuck1);
                    scene.beginAnimation(Chuck1,0,2*10,true,spindleSpeed*0.005);
                  }
                  resetfunctionbutton();
                }

                else if(pressed == "XbuttonnumButtonAbsSet"){
                  xOrigin =  parseFloat(xCoordinate.value);
                  console.log("xorigin: ");
                  console.log(xOrigin);
                  xzButtonSelected = 0;
                  sequence = [];
                  sequenceIdx = 0;
                  pressed = "";
                }

                else if(pressed == "ZbuttonnumButtonAbsSet"){
                  zOrigin = parseFloat(zCoordinate.value);
                  console.log("zorigin: ");
                  console.log(zOrigin);
                  xzButtonSelected = 0;
                  sequence = [];
                  sequenceIdx = 0;
                  pressed = "";
                }
                //Do one, Taper function
                else if(pressed == "f3btnf1btnAbsSet"){
                   stopObserver = 0;
                   var frameRate = 10;
                   var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                   var keyFramesX= [];
                   var keyFramesZ= [];
                   var startingPositionX = box.position.x;
                   var startingPositionZ = box.position.z;
                   var  boxAttr =  box.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                   console.log(boxAttr);
                   keyFramesX.push({
                       frame: 0,
                       value: startingPositionX
                   });
                   keyFramesX.push({
                       frame: frameRate,
                       value:  startingPositionX+1
                   });
                   keyFramesX.push({
                       frame: 2 * frameRate,
                       value: startingPositionX
                   });
                   xSlide.setKeys(keyFramesX);
                   //Rotation Animation
                   var zSlide = new BABYLON.Animation("zSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                   keyFramesZ.push({
                       frame: 0,
                       value: startingPositionZ
                   });
                   keyFramesZ.push({
                       frame: frameRate,
                       value:  startingPositionZ-1
                   });
                   keyFramesZ.push({
                       frame: 2 * frameRate,
                       value: startingPositionZ
                   });
                   zSlide.setKeys(keyFramesZ);
                   box.animations.push(zSlide);
                   box.animations.push(xSlide);
                   var currentPositionX = box.position.x;
                   var currentPositionZ = box.position.z;
                   scene.beginAnimation(box,0,2*frameRate,true);
                   var observer = scene.onBeforeRenderObservable.add(function () {
                     lathe_engine_anim1();
                     if(stopObserver == 1){
                       scene.onBeforeRenderObservable.remove(observer);

                     }
                   });
                }

                // Implement ReturnHome function
                else if(pressed == "f6btnGO"){
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
                      value: home_position_z
                  });

                  var itHasStopped = function () {
                      box.position.z = home_position_z;
                      zCoordinate.value = parseFloat(box.position.z);
                  }

                  GoToAnimationX.setKeys(keyFrames);

                  var GoToAnimationZ = new BABYLON.Animation('GotoAnimation', 'position.x', frameRate1, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                  console.log(box.position.x);
                  var keyFrames2 = [];
                  keyFrames2.push({
                      frame: 0,
                      value: box.position.x
                  });

                  keyFrames2.push({
                      frame: 2 * frameRate1,
                      value: home_position_x
                  });

                  var itHasStopped2 = function () {
                      box.position.x = home_position_x;
                      xCoordinate.value = parseFloat(box.position.x);
                      scene.beginDirectAnimation(box, [GoToAnimationX], 0, 2 * 10, false, 1, itHasStopped);
                  }

                  GoToAnimationZ.setKeys(keyFrames2);

                  box.animations.push(GoToAnimationZ);
                  scene.beginDirectAnimation(box, [GoToAnimationZ], 0, 2 * 10, false, 1, itHasStopped2);

                }
            }, false);
        }

        return scene;
    }


    scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

});

// Didn't delete this yet because it is in taper, which I want to explore more
function lathe_engine_anim1() {

    var x = box.position.x - 3;
    var z = box.position.z - 3;

    // If within range to cut and moving in the proper direction
    if (x < 4 && z < 0) {
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

}



/**
 * Code for making cutting tool movements in x and z directions
 */

function lathe_engine(delta_x, delta_z) {

    var bad_cut = false;

    // if (fwdOn === 0) bad_cut = true;

    var x = box.position.x - 9.7;
    var z = box.position.z - 2;


    // If within range to cut and moving in the proper direction
    if (x <= 4 && z <= 0 && (delta_x < 0 || delta_z < 0)) {

        var abs_x = Math.abs(x);
        var abs_z = Math.abs(z);

        var max_x = -1000;
        var min_z = 1000;

        var pt_fnd = false;

        var bad_pts = [];

        // Removing points that are cut off by box
        for (var i = 0; i < lathe_pts.length && ! bad_cut; i++) {
            var item = lathe_pts[i];

            if (item.x >= abs_x && item.y <= abs_z) {

                max_x = Math.max(max_x, item.x);
                min_z = Math.min(min_z, item.y);

                var depth_x = Math.abs(abs_x - max_x); // Depth of cut in x direction
                var depth_z = Math.abs(abs_z - min_z);

                if (fwdOn === 1) {
                    if ((depth_x > depth_set && delta_z < 0) || (depth_z > depth_set && delta_x < 0)) {
                        console.log("cut too deep");
                        bad_cut = true;
                        // TODO: can add a better warning here!!!
                        if (delta_x !== 0) return; // This line prevents a rendering glitch in the x direction
                    }
                    pt_fnd = true;

                    bad_pts.push(i);
                } else {
                    if ((depth_x > delta && delta_z < 0) || (depth_z > delta && delta_x < 0)) {
                        console.log("cut too deep");
                        bad_cut = true;
                        // TODO: can add a better warning here!!!
                        if (delta_x !== 0) return; // This line prevents a rendering glitch in the x direction
                    }
                    pt_fnd = true;

                    bad_pts.push(i);
                }
            }
        }



        // Only do these if need to cut out shape
        if (fwdOn === 1 && pt_fnd) {

            var new_pts;


            var adj = 0;
            for (var i = 0; i < bad_pts.length; i++) {
                lathe_pts.splice(bad_pts[i]-adj,1);
                adj++;
            }

            if (Math.abs(abs_x - max_x) <= 0.02 || Math.abs(abs_z - min_z) <= 0.02) new_pts = [ // TODO: this prevents a cutting problem if at the same height
                    new BABYLON.Vector3(max_x, min_z, 0)                                         // TODO: or width, could be incorporated better earlier
                ];
            else if (x <= .25) {
                new_pts = [    // If cutting tool has completely gone through the material
                    new BABYLON.Vector3(max_x, abs_z, 0),
                ];
            }
            else {
                new_pts = [
                    new BABYLON.Vector3(abs_x, min_z, 0),
                    new BABYLON.Vector3(abs_x, abs_z, 0),
                    new BABYLON.Vector3(max_x, abs_z, 0),
                ];
            }

            // Splicing in these pts and breaking when done
            for (var i = 0; i < lathe_pts.length; i++) {
                item = lathe_pts[i];
                if (item.x >= abs_x && item.y >= abs_z) {
                    lathe_pts.splice(i, 0, ...new_pts);
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

            console.log(lathe_pts); // if want to see points that lathe is registering
        }
    }

    // These are set nicely to keep the box within a desired range

    // if x is not less than 0
    if (!bad_cut && delta_x !== 0 &&
        x + delta_x >=bound_limit_x &&
        box.position.x + delta_x >= gotoLimitNx &&
        box.position.x + delta_x <= gotoLimitx) {
        box.position.x += delta_x;
        toolpost.position.x += delta_x;
    } else if (!bad_cut && delta_z !== 0 &&
        z + delta_z >=bound_limit_z &&
        box.position.z + delta_z >= gotoLimitNz &&
        box.position.z + delta_z <= gotoLimitz) {

        // If past the origin
        if (box.position.x - box_size/2 <= 0) {
            box.position.z = Math.max(-lathe_pts[0].y+box_size/2, box.position.z + delta_z);
        } else { // otherwise
            box.position.z += delta_z;
            toolpost.position.z += delta_z;
        }

    } else {
        return false;
    }

    xCoordinate.value = (parseFloat(xOrigin += delta_x)/10).toFixed(4);
    zCoordinate.value = (parseFloat(zOrigin += delta_z)/10).toFixed(4);


    completeTask([box.position.x,box.position.z]);

    return true;
}


/**
 * Code for the D3 wheels
 */



var dragOne = d3.behavior.drag()
    .on('drag', dragOne);

var dragTwo = d3.behavior.drag()
    .on('drag', dragTwo);

var $container = $('.svg-container'),
    width = $container.width(),
    height = $container.height();

var handle_size = width*.025;

var r = height*.48;
var inset = .7;
var y_pos = 0;
var spin_speed = 1;

var pos_wheel_1 = (width*.25-r);
var pos_wheel_2 = (width*.75-r);

var handle_size = r*.2;

var g = d3.select('svg')
    .attr('viewBox','0 0 '+width +' '+height )
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr('transform', 'translate(' + r + ',' + r + ')');

g.append('circle')
    .attr({
        class: 'outer1',
        r: r,
        cx: pos_wheel_1,
        cy: y_pos
    });

g.append('circle')
    .attr({
        class: 'rotatable1',
        r: handle_size,
        cx: pos_wheel_1 + inset * r * Math.cos(0),
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
        r: handle_size,
        cx: pos_wheel_2 + inset * r * Math.cos(0),
        cy: y_pos + inset * r * Math.sin(0),
    })
    .call(dragTwo);

// store initial points
var xInit1 = d3.select('.rotatable1').attr('cx');
var yInit1 = d3.select('.rotatable1').attr('cy');

var xInit2 = d3.select('.rotatable2').attr('cx');
var yInit2 = d3.select('.rotatable2').attr('cy');


// function to reset the shape, wheel positions, etc.
function reset() {
    // Resetting lathe shape
    lathe.dispose();
    lathe_pts = lathe_pts_init.slice(0);
    lathe = BABYLON.MeshBuilder.CreateLathe("lathe", {
        shape: lathe_pts,
        cap: Mesh.CAP_ALL,
        updateable: true
    }, scene);
    lathe.rotation.x = -Math.PI / 2;

    // Resetting box to original origin
    xOrigin = 15;
    zOrigin = 3;

    box.position = new BABYLON.Vector3(xOrigin, -1.1, zOrigin);
    toolpost.position = new BABYLON.Vector3(xOrigin-3.9, -5, zOrigin+3.4);

    xCoordinate.value = (parseFloat(xOrigin)/10).toFixed(4);
    zCoordinate.value = (parseFloat(zOrigin)/10).toFixed(4);

    // Resetting D3 wheels
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

    // Stop lathe from spinning
    scene.stopAnimation(Chuck1);
    music.stop();
    fwdOn = 0;

    camera.alpha = 0;
    camera.beta = BABYLON.Tools.ToRadians(50);
    camera.radius = 50;
    camera.target = box.position; // TODO: fix this
    // camera.attachControl(canvas, true);
}


var rot_one = 0;
var rad_prev_one = 0;
var rect_xfr_prev_one = 0;

function dragOne() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x - pos_wheel_1;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    // Only allow wheels to turn and box to move if not going to send box out of bounds
    var rot = rot_one;

    if (rad_prev_one >= 2.7) {
        if (rad < -2.7) {
            if (rot_one === -1) rot = 0;
            else rot = rot_one !== 0 ? rot_one + 2 : rot_one + 1;
        }
    } else if (rad_prev_one <= -2.7) {
        if (rad > 2.7) {
            if (rot_one === 1) rot = 0;
            else rot = rot_one !== 0 ? rot_one - 2 : rot_one - 1;
        }
    }

    var rad_adj;

    if (rot > 0) rad_adj = Math.PI + rad;
    else if (rot < 0) rad_adj = rad - Math.PI;
    else rad_adj = rad;

    var rect_xfr = spin_speed * (rot * Math.PI + rad_adj); // last factor deals with fine / coarse

    if (Math.abs(rect_xfr-rect_xfr_prev_one) > .01 && lathe_engine(0, rect_xfr >= rect_xfr_prev_one ? delta : -delta)) {
        d3.select(this)
            .attr({
                cx: inset * r * Math.cos(rad) + pos_wheel_1,
                cy: y_pos + inset * r * Math.sin(rad)
            });

    } else {
        console.log("bad turn!");
    }

    rect_xfr_prev_one = rect_xfr;
    rad_prev_one = rad;
    rot_one = rot;
}

var rot_two = 0;
var rad_prev_two = 0;
var rect_xfr_prev_two = 0;

function dragTwo() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x - pos_wheel_2;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    // Only allow wheels to turn and box to move if not going to send box out of bounds
    var rot = rot_two;

    if (rad_prev_two >= 2.7) {
        if (rad < -2.7) {
            if (rot_two === -1) rot = 0;
            else rot = rot_two !== 0 ? rot_two + 2 : rot_two + 1;
        }
    } else if (rad_prev_two <= -2.7) {
        if (rad > 2.7) {
            if (rot_two === 1) rot = 0;
            else rot = rot_two !== 0 ? rot_two - 2 : rot_two - 1;
        }
    }

    var rad_adj;

    if (rot > 0) rad_adj = Math.PI + rad;
    else if (rot < 0) rad_adj = rad - Math.PI;
    else rad_adj = rad;

    var rect_xfr = spin_speed * (rot * Math.PI + rad_adj); // last factor deals with fine / coarse

    // debounced
    if (Math.abs(rect_xfr-rect_xfr_prev_two) > .01 && lathe_engine(rect_xfr >= rect_xfr_prev_two ? -delta : delta, 0)) {
        d3.select(this)
            .attr({
                cx: inset * r * Math.cos(rad) + pos_wheel_2,
                cy: y_pos + inset * r * Math.sin(rad)
            });

    } else {
        console.log("bad turn!");
    }

    rect_xfr_prev_two = rect_xfr;
    rad_prev_two = rad;
    rot_two = rot;
}
