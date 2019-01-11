let delta = 0.025; // how much box moves when command it to move
let xOrigin = 15; // x home position for cutting tool
let zOrigin = 3; // z home position for cutting tool
// let xOrigin = 15; // x home position for cutting tool
// let zOrigin = 1.9; // z home position for cutting tool
let box_size = 6; // length of one side of the box
let bound_limit_z = -15.6; // limit to how far box can go in the z direction
let bound_limit_x = -20; // limit to how far box can go in the x direction
let depth_set = 1;

/**
 * BabylonJS code
 */

var box;
var lathe;
var scene;
var tailstock;
var Chuck1;
var fwdOn = 0;
var box1;
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

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();


        // box1 = BABYLON.Mesh.CreateBox("Box", box_size, scene);
        // box1.position = new BABYLON.Vector3(xOrigin, -3, zOrigin);
        xCoordinate.value = parseFloat(xOrigin).toFixed(4);;
        zCoordinate.value = parseFloat(zOrigin).toFixed(4);;


        lathe = BABYLON.MeshBuilder.CreateLathe("lathe", {
            shape: lathe_pts,
            cap: Mesh.CAP_ALL,
            updateable: true
        }, scene);
        lathe.rotation.x = -Math.PI / 2;

        BABYLON.SceneLoader.ImportMesh("", "", "res/models/Cuttingtool.STL",
          scene, function (newMeshes) {
              box = newMeshes[0];

              box.position = new BABYLON.Vector3(xOrigin, -1.1, zOrigin);
              //box.rotation.y = Math.PI/2;
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
          });

          BABYLON.SceneLoader.ImportMesh("", "", "res/models/Toolpost.stl",
            scene, function (newMeshes) {
                toolpost = newMeshes[0];
                //toolpost.rotation.z = Math.PI/8;
                //11, 5.8
                //15, 1.9
                toolpost.position = new BABYLON.Vector3(xOrigin-3.9, -4.6, zOrigin+3.6);
                var toolpost_scale = .5;
                toolpost.scaling.x = toolpost_scale;
                toolpost.scaling.y = toolpost_scale;
                toolpost.scaling.z = toolpost_scale;
            });

        // Back of material that is in the chuck
        cyl = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 6.3, diameter: 8}, scene);
        cyl.position=new BABYLON.Vector3(0,0,-19.15);
        cyl.rotation.x=Math.PI/2;

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

      //  box1.material = material2;

// Shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.getShadowMap().renderList.push(box);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.useKernelBlur = true;
        shadowGenerator.blurKernel = 64;

// Ground
        var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
        ground.position.y = -6;

        var camera = new BABYLON.ArcRotateCamera("arcCam",
            0,
            BABYLON.Tools.ToRadians(55),
            50, new BABYLON.Vector3(xOrigin, -3, zOrigin), scene);
        camera.attachControl(canvas, true);

        // Keyboard events
        // box.actionManager = new BABYLON.ActionManager(scene);
        // box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
        //     completeTask('box');
        // }));

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
                completeTask([box.position.x,box.position.z]);
            }
            if (inputMap["w"] || inputMap["ArrowUp"]) {
                lathe_engine(-delta, 0);
                completeTask([box.position.x,box.position.z]);
            }
            if (inputMap["a"] || inputMap["ArrowLeft"]) {
                lathe_engine(0, -delta);
                completeTask([box.position.x,box.position.z]);
            }
            if (inputMap["s"] || inputMap["ArrowDown"]) {
                lathe_engine(delta, 0);
                completeTask([box.position.x,box.position.z]);
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

                    if (currentMesh.rotation.x > currentMeshX) {
                          if (currentMesh == wheel && xOrigin < gotoLimitx) {
                              box.position.x += finecoarse;
                              toolpost.position.x += finecoarse;
                              lathe_engine_anim1();
                              completeTask([box.position.x,box.position.z]);
                              xCoordinate.value = parseFloat(xOrigin += finecoarse).toFixed(4);
                              //xCoordinate.value = parseFloat(box.position.x);
                          } else if (currentMesh == wheel2 && zOrigin > gotoLimitNz) {
                              box.position.z -= finecoarse;
                              toolpost.position.z -= finecoarse;
                              lathe_engine_anim1();
                              completeTask([box.position.x,box.position.z]);
                              zCoordinate.value = parseFloat(zOrigin -= finecoarse).toFixed(4);;
                              //zCoordinate.value = parseFloat(box.position.z);
                          }

                      } else if (currentMesh.rotation.x < currentMeshX) {
                          if (currentMesh == wheel && xOrigin > gotoLimitNx) {
                              box.position.x -= finecoarse;
                              toolpost.position.x -= finecoarse;
                              lathe_engine_anim1();
                              completeTask([box.position.x,box.position.z]);
                              xCoordinate.value = parseFloat(xOrigin -= finecoarse).toFixed(4);;
                              //xCoordinate.value = parseFloat(box.position.x);
                          } else if (currentMesh == wheel2 && zOrigin < gotoLimitz) {
                              box.position.z += finecoarse;
                              toolpost.position.z += finecoarse;
                              lathe_engine_anim1();
                              completeTask([box.position.x,box.position.z]);
                              zCoordinate.value = parseFloat(zOrigin += finecoarse).toFixed(4);;
                              //zCoordinate.value = parseFloat(box.position.z);
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
                    console.log('tailstock clicked');
                    completeTask('tailstock');
                }));
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
                        console.log('chuck clicked');
                        completeTask('chuck');
                    }));
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

        var music = new BABYLON.Sound("FWDSound", "res/sounds/lathe_sound_effect.mp3", scene, null, {loop: true, autoplay: false});
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
                //Implement GOTO;
                if (pressed == "f4btnXbuttonnumButtonAbsSetZbuttonnumButtonAbsSet"
                    || pressed == "f4btnZbuttonnumButtonAbsSetXbuttonnumButtonAbsSet") {
                    sequence = [];
                    sequenceIdx = 0;
                    var GoToXPosition = parseFloat(xCoordinate.value);
                    var GoToZPosition = parseFloat(zCoordinate.value);

                    if(GoToZPosition>zOrigin){
                      gotoLimitz = GoToZPosition;
                    }
                    else{
                      gotoLimitNz = GoToZPosition;
                    }

                    if(GoToXPosition>xOrigin){
                      gotoLimitx = GoToXPosition;
                    }
                    else{
                      gotoLimitNx = GoToXPosition;
                    }
                }
                //spindle speed: constant rpm
                else if(pressed == "f7btnnumButtonIncSet" || pressed == "f7btnnumButtonAbsSet"){
                  if (fwdOn == 1){
                    scene.stopAnimation(Chuck1);
                    scene.beginAnimation(Chuck1,0,2*10,true,spindleSpeed*0.005);
                    resetfunctionbutton();
                  }
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
            //console.log(lathe_pts);
        }
    }

}



/**
 * Code for making cutting tool movements in x and z directions
 */

function lathe_engine(delta_x, delta_z) {


    var bad_cut = false;

    // if (fwdOn === 0) bad_cut = true;

    var x = box.position.x - 11.05;
    var z = box.position.z - 1.25;

    console.log(x);
    console.log(z);



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

                if ((depth_x > depth_set && delta_z < 0) || (depth_z > depth_set && delta_x < 0)) {
                    console.log("cut too deep");
                    bad_cut = true;
                    // TODO: can add a better warning here!!!
                    if (delta_x !== 0) return; // This line prevents a rendering glitch in the x direction
                } else if (fwdOn !== 0) {
                    pt_fnd = true;

                    bad_pts.push(i);
                } else {
                    bad_cut = true;
                }
            }
        }

        // Only do these if need to cut out shape
        if (pt_fnd) {

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

        console.log("special: " + (box.position.x - box_size/2));

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

    xCoordinate.value = parseFloat(box.position.x).toFixed(4);;
    zCoordinate.value = parseFloat(box.position.z).toFixed(4);;


    completeTask(null); // Need to check shape cut out

    return true;
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

    box.position.x = xOrigin;
    box.position.z = zOrigin;

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

    // TODO: also want to reset the 3D buttons here, or do they need to be reset ???
    // TODO: @YUTENG: please add stuff here to reset stuff related to your functions, thanks!
}


var rot_one = 0;
var rad_prev_one = 0;
var box_unmoved = false;

function dragOne() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    // console.log(rad + " | " + rad_prev_one + " | " + (rad-rad_prev_one));

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

    var rect_xfr = spin_speed * (rot * Math.PI + rad_adj) * delta*8; // last factor deals with fine / coarse
    var xfr_delta = -(box.position.z - rect_xfr)+zOrigin;

    console.log(rot);
    console.log(xfr_delta);

    // Need to deal with case when stuck at edge and keep rotating
    // the wheel so does not keep registering the user's movements
    if (Math.abs(xfr_delta) > (2*Math.PI)) {
        if (rot === -1) rot = 0;
        else rot = rot < 0 ? rot + 2 : rot - 2;

        rect_xfr = spin_speed * (rot * Math.PI + rad_adj) * delta*8; // last factor deals with fine / coarse
        xfr_delta = -(box.position.z - rect_xfr)+zOrigin;
    }

    console.log(xfr_delta);

    if (lathe_engine(0, xfr_delta)) {
        d3.select(this)
            .attr({
                cx: inset * r * Math.cos(rad),
                cy: y_pos + inset * r * Math.sin(rad)
            });
        box_unmoved = false;
    } else {
        console.log("bad turn!");
        box_unmoved = true;
    }

    rad_prev_one = rad;
    rot_one = rot;

}

var rot_two = 0;
var rad_prev_two = 0;

function dragTwo() {
    // calculate delta for mouse coordinates
    var deltaX = d3.event.x - pos_wheel_2;
    var deltaY = d3.event.y - y_pos;

    var rad = Math.atan2(deltaY, deltaX);

    console.log(rad + " | " + rad_prev_two + " | " + (rad - rad_prev_two));

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

    var rect_xfr = spin_speed * (rot * Math.PI + rad_adj)  * delta*8; // last factor deals with fine / coarse
    var xfr_delta = -(box.position.x - rect_xfr) + xOrigin;

    console.log(rot);
    console.log("xfr before" + " | " + xfr_delta);

    // Need to deal with case when stuck at edge and keep rotating
    // the wheel so does not keep registering the user's movements
    if (Math.abs(xfr_delta) > (2 * Math.PI)) {
        if (rot === -1) rot = 0;
        else rot = rot < 0 ? rot + 2 : rot - 2;

        rect_xfr = spin_speed * (rot * Math.PI + rad_adj)  * delta*8; // last factor deals with fine / coarse
        xfr_delta = -(box.position.x - rect_xfr) + xOrigin;
    }

    console.log("xfr after" + " | " + xfr_delta);


    if (lathe_engine(xfr_delta, 0)) {
        d3.select(this)
            .attr({
                cx: inset * r * Math.cos(rad) + pos_wheel_2,
                cy: y_pos + inset * r * Math.sin(rad)
            });
    } else {
        console.log("bad turn!");
    }

    console.log(box.position.x);

    rad_prev_two = rad;
    rot_two = rot;
}
