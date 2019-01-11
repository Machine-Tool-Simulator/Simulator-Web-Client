// TODO: organize this file with the other (the other is the original)
let videos = [
    {
        "index":1,
        "title":"Introduction",
        "src":"https://drive.google.com/file/d/170xPqHaD2Rx57sdlq5Stm0qS5uytzwKI/preview",
        "text":"Welcome to the lathe. The lathe is a machine that we can use to make metal parts that have a cylindrical shape. It works by spinning around a piece of metal and cutting away material from it.<br>For example, a lathe was used to make several of the parts of this model sterling engine, such as this part called a flywheel, this part called an axel, and this part called a bushing.<br>Let's look at the process for making a bushing.",
    },
    {
        "index":2,
        "title":"Timelapse",
        "src":"https://drive.google.com/file/d/17_yJl_WwA8M96-jbezJe4RkUmAfHhblS/preview",
        "text":"[Insert text for timelapse once voiceover]"
    },  // TODO: Insert text for timelapse when have Nicks
    {
        "index":3,
        "title":"Safety",
        "src":"https://drive.google.com/file/d/1q-yXx55mwrmt6_tKPmrwYlV8GqNoNNRa/preview",
        "text":"Hello. This tutorial is meant to provide you with basic instruction on the six CNC lathes that we have here in the shop. If your component is cylindrically symmetric, a lathe is probably the machine that you will use to manufacture it.<br>The safety rules for the rest of the shop apply to the lathes as well.<br>1. Always wear safety glasses and a hat when operating any machinery in the shop.<br>2. However there are a few additional precautions that need to be taken when operating a lathe. First, make sure there are no loose items on your body that can get caught in the machine this includes items like watches bracelets necklaces and especially hair<br>3. The lathe will be spinning very fast during manufacturing and there are several protrusions on the lathe which can catch on hair and clothing. Never reach or lean into the work area when the machine is running.<br>4. In addition loading and unloading parts in the Chuck requires using a small square wrench to tighten the jaws. Never under any circumstances leave this wrench in the Chuck, not even for a moment. If the lane has accidentally started while the wrench is in the Chuck, the wrench will be flung out of the machine and could cause serious injury.<br>These are just some of the main safety concerns with the lathe there are others. Before using the lathe on your own, you will need to be trained by one of the shop staff."
    },
    {
        "index":4,
        "title":"Parts of the Lathe",
        "src":"https://drive.google.com/file/d/11ap4hcucbOaNVDCbi0sh59OPCUD9Yr6o/preview",
        "text":"The spindle extends into the back of the machine and is what generates the spinning motion. The chuck is attached to the spindle. The chuck is what holds onto the part so that when the spindle spins, the part spins as well. The chuck holds onto a cutting tool and allows the cutting tool to move. The tailstock holds onto tools that go along the center axis, such as drill bits, and allows you to drill into the center of the part.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>In order, select the following parts:<br>1. The tailstock<br>2. The carriage and cutting tool<br>3. The chuck",
        "tasks": [
            {
                "click": "tailstock"
            },
            {
                "click": "box"
            },
            {
                "click": "chuck"
            }
        ]
    },
    {
        "index":5,
        "title":"Loading the Chuck",
        "src":"https://drive.google.com/file/d/1HrxZ9SqB2KShmBVlPgYjOfM85qTbjMZv/preview",
        "text":"The area of the spindle where you attach a part into is called the chuck. This particular chuck has six jaws. In order to load a part into the chuck, place it at least one inch into the jaws. You can use a tool called a chuck key to fasten the jaws and tighten them. Press the chuck key into the square hole and twist it clockwise. Tighten it as much as you can. The part is now fastened into the chuck."
    },
    {
        "index":6,
        "title":"Turning on the Spindle",
        "src":"https://drive.google.com/file/d/1XJ0k4MLwRJvKNz54EUKnh9AzjP2tWtzI/preview",
        "text":"To turn the spindle on, press the forward button on the spindle control. The speed can be controlled with the spindle speed button.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>1. Press the \"FWD\" button on the control to turn on the spindle.<br>2. Press the \"OFF\" button on the control to turn off the spindle.<br><strong>NOTE:</strong>For the next sessions, the lathe must be turned on before you will be able to cut out a shape.",
        "tasks":[
            {
                "press":"FWD",
                "highlight":true
            },
            {
                "press":"OFF",
                "highlight":true
            }
        ]
    },
    {
        "index":7,
        "title":"Constant RPM",
        "src":"https://drive.google.com/file/d/1SmuPAJPo4dQPUxLYRslcIwyyc7k5JbUD/preview",
        "text":"There are two ways to specify the spindle speed. Pressing \"INC SET\" will specify a constant RPM and pressing \"ABS SET\" will specify a constant SFM. Constant RPM will spin the spindle at a constant number of revolutions per minute no matter where the tool is.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>1. Select \"SPIN SPEED\" using the button below the control screen to set RPM.<br>2. Enter \"500\" as the value using the numeric keypad.<br>3. Press the \"INC SET\" button to set constant RPM.",
        "tasks":[
            {
                "press":"RPM",
                "highlight":true
            },
            {
                "press":"INC_SET",
                "conditions":{
                    "buffer":500
                },
                "highlight":true
            }
        ]
    },
    {
        "index":8,
        "title":"Constant SFM",
        "src":"https://drive.google.com/file/d/1jnq_N92G--HP1bjzjdfzLLCaSHbjOfe3/preview",
        "text":"Constant SFM will adjust the RPM of the spindle depending on the tools radial position to maintain a constant linear velocity of the tool relative to the surface of the material. This puts less stress on the tool and leaves a nicer finish.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>1. Select \"Spin Speed\" using the button below the control screen to set RPM <br>2. Enter \"250\" as the value using the numeric keypad.<br>3. Press the \"ABS SET\" button to set constant SFM.",
        "tasks":[
            {
                "press":"RPM",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":250
                },
                "highlight":true
            }
        ]
    },
    {
        "index":9,
        "title":"X and Z Coordinate System",
        "src":"https://drive.google.com/file/d/16Rsc90nUyvINQ9UJZ2UkgVNnxIpS3HgM/preview",
        "text":"The lathe measures the cutting tool's position with x and z coordinates. X represents the diameter about the spindle axis. The x coordinate value is twice the distance of the cutting tool from the spindle axis. A smaller x position represents a smaller diameter. A larger x position represents a larger diameter. Z represents the linear direction from left to right. Plus z direction is to the right, minus z direction is to the left."
    },
    {
        "index":10,
        "title":"X and Z Wheels",
        "src":"https://drive.google.com/file/d/1FEJn5YMX92adnGUo_1J9pwTq7wtuexuF/preview",
        "text":"You can manually move the cutting tool by rotating the z wheel and the x wheel.<br>When you rotate the x wheel clockwise, the cutting tool moves closer to the spindle axis, resulting in a smaller x position for a smaller diameter. When you rotate the x wheel counter-clockwise, the cutting tool moves away from the spindle axis resulting in a larger x position or larger diameter.<br>When you rotate the z wheel clockwise, the cutting tool moves to the right, resulting in a greater z position. When you rotate the z wheel counter-clockwise, the cutting tool moves to the left resulting in a lesser z position.<br>You can also move a joystick to move the cutting tool. This is not recommended, since the joystick makes the cutting tool moves so fast that it can be difficult to react if you accidently move the cutting tool into the chuck or into the part.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>Using the x and z wheels, move the cutting tool to a position of x = 0.8 in, z = -0.2 in.",
        "tasks": [
            {
                "coord": {
                    "x": 8,
                    "z": -2
                }
            }
        ]
    },
    {
        "index":11,
        "title":"Fine and Coarse Control",
        "src":"https://drive.google.com/file/d/1TZXP9VHU0nqVB3r-EOS4hV4QHJY348zE/preview",
        "text":"Let's talk about the difference between fine mode and coarse mode. We will use the term fine mode for moving slowly and the term coarse mode for moving quickly. Take a look at how fast the cutting tool moves when the control is set to fine mode and you turn the wheel.<br>Now switch to coarse mode and see how quickly the cutting tool moves when you turn the wheel at the same speed. The cutting tool moves much faster when in coarse mode. This is good when you want to quickly move the tool to a certain position. However, coarse mode moves the cutting tool too quickly for actual cutting. When you are cutting metal, be sure to use fine mode so that the cutting tool moves through the metal slowly. Using fine mode during cutting gives you more control over what you are doing and reduces the chance of breaking tools.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>Practice switching between fine and coarse control and adjusting the position of the cutting tool using the x and z wheels.",
        "tasks":[
            {
                "press":"FC",
                "highlight":true
            },
            {
                "press":"FC",
                "highlight":true
            }
        ]

    },
    {
        "index":12,
        "title":"Cutting and Setting Z Coordinate System",
        "src":"https://drive.google.com/file/d/1dDJ7XO4W8aN-Pj1l3LGL1pc-x0nCljBI/preview",
        "text":"You are now ready to cut some metal. We will start by doing a process called facing off the part. This is how you assemble where z equals 0. Position the cutting tool slightly towards you from the diameter of the part and slightly to the left of the edge of the part.<br>Turn on the spindle.<br>Use the x wheel to move the cutting wheel into the part. Keep moving x wheel until it is no longer making chips, this should be towards the center of the part.<br>Turn the x wheel the other way to move the cutting tool back outside the diameter of the part.<br>Establish this position as the z origin by pressing z, 0, ABS SET.<br>Turn off the spindle.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>Face off the part to set the z coordinate system by:<br>1. Positioning the cutting tool slightly towards you from the diameter of the part and slightly to the left of the edge of the part (it must be at position X=0.75, Z=0.2 before you proceed).<br>2. Turning on the spindle to cut out a piece of the material.<br>3. Using the x wheel to move the x wheel through to the center of the part (so that you completely remove a section of the material, to position X=0.3, Z=0.2 to proceed). Note, you will only be able to cut out a small amount of the material at a time, like with the real machine tool.<br>4. Using the x wheel to move the cutting tool outside the diameter of the wheel.<br>5. Establishing a new z = 0 coordinate system by pressing z, 0, ABS SET.<br>6. Turn off the spindle.<br>7. Practice moving the cutting tool around with the new x coordinate system and note the differences from the previous coordinate system.",
        "tasks":[
            {
                // +- 0.5
                "position":[7.5, 2.0],
                "highlight":true
            },
            {
                "press":"FWD",
                "highlight":true
            },
            {
                // +- 0.5
                "position":[3.0, 2.0],
                "highlight":true
            },

            {
                "press":"Z",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":0
                },
                "highlight":true
            },
            {
                "press":"OFF",
                "highlight":true
            }
        ]
    },
    {
        "index":13,
        "title":"Setting X Coordinate System",
        "src":"https://drive.google.com/file/d/1mQvL8J2SCZp_3jK0jatF4MdY9ZFBpCGV/preview",
        "text":"To measure the dimensions of the part that you have been working on, you can use a tool called calipers. Calipers represent the distance between two points with a very high level of precision. When you move the calipers apart, the distance increases. When you move the calipers closer together, the distance decreases.<br>You are now ready to establish the x coordinate system. Position the cutting tool slightly to the right of z 0 and slightly to the inside of the part's diameter .<br>Turn on the spindle.<br>Use the z wheel to move the cutting tool into the part, making a smaller outside diameter than the rest of the raw material.<br>Reverse the z wheel to bring the cutting tool off of the part.<br>Turn off the spindle.<br>Now you will use the calipers to measure the diameter that you just cut. Open up the calipers and press them onto the outside diameter. Press them together and try to find the smallest number that you can find. In this case, the diameter is reading at about 0.412 inches.<br>To complete the process of establishing the x coordinate system, type in the number that you measured into the control. Press x, then type in the diameter, and then press ABS SET.<br>Now that the coordinate system is established, z 0 represents that far right edge of the part and the x coordinate represents the actual diameter at the position of the cutting tool.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>1. Position the cutting tool slightly to the right of z 0 and lsightly to the inside of the part's diameter (past X=0.8 and Z=0.45).<br>2. Turn on the spindle.<br>3. Use the z wheel to slightly cut into the material, making a smaller diameter than the rest of the material (past X=0.7, Z=0.3).<br>4. Reversing the z wheel to bring the cutting tool off of the part.<br>5. Turn off the sipndle.<br>6. Assume that the distance that you measure using calipers is 0.412 inches like in the video. Type the number into the control and press ABS SET to set the x coordinate system.<br>7. Practice moving the cutting tool around with the new x coordinate system and note the differences from the previous coordinate system.",
        "tasks":[
            {
                  // >5,>3
                "position":[8, 4.5],
                "highlight":true
            },
            {
                "press":"FWD",
                "highlight":true
            },
            {
                  // >5,>3
                "position":[7, 3],
                "highlight":true
            },
            {
                "press":"OFF",
                "highlight":true
            },
            {
                "press":"X",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":0.412
                },
                "highlight":true
            }
        ]
    },
    {
        "index":14,
        "title":"Setting a GoTo Position",
        "src":"https://drive.google.com/file/d/11gcfT-G8VW5DYYKOnr7Gkb_U9WXfTPDL/preview",
        "text":"Now you can work on cutting the part to a particular diameter. Let's say for example that the part is supposed to have 0.41 inches diameter and 0.5 inches long. You can use the GoTo function to prepare the lathe for making this.<br>Press GoTo. Press z -0.5 ABS SET. Press x 0.41 ABS SET.<br>The cutting tool now won't move any further than the points you have programmed using GoTo. You will make several small cuts in order to reduce the diameter until it reaches the desired diameter. The amount of diameter that you cut off at once is called a depth of cut. A relatively conservative depth of cut is something like 0.03 inches of diameter at a time, whereas a relatively aggressive depth of cut is something like 0.1 inches of diameter at a time.<br>The steps for making a cut are position the cutting tool to the right of z 0 and one depth of cut inside the part. In this case, the diameter of the raw material is 0.5 inches. In order to make a cut with a depth of 0.03 inches, you will position the cutting tool at an x value of 0.47.<br>Verify that the machine is in fine mode. This is necessary for when you are cutting material.<br>Turn on the spindle.<br>Turn the z wheel counter-clockwise until the tool reaches the programmed GoTo position.<br>Turn the x wheel the same way to move the cutting tool to move the cutting tool away from the spindle axis.<br>Turn the z wheel clockwise until the cutting tool is to the right of z 0 again.<br>Turn the x wheel clockwise until the cutting tool is at a position of 0.03 inches smaller than the existing diameter.<br>Repeat this process, cutting of 0.03 inches of diameter at a time, until the final diameter is reached.<br>The part now has the desired geometry.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>Cut out the following shape:<br><img src='res/imgs/goto_shape.png' width=100%><br>1. Set a GoTo position of x = 0.5 in. and z = -0.5 in. The cutting tool will not be able to move further than these coordinates.<br>2. Do NOT exit the GoTo function interface or the desired GoTo position will no longer be held and you will have to rest.<br>3. As shown in the video, progressively cut out the material up to this position by moving the cutting tool. The lathe must be turned on before cutting, which can be done by pressing the FWD button.<br>4. You will not be able to make a depth of cut greater than 1 due to constraints.<br>5. Press submit (you will only be able to proceed once the proper shape has been cut out).",
        "tasks":[
            {
                "press":"GOTO",
                "highlight":true
            },
            {
                "press":"X",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":5
                },
                "highlight":true
            },
            {
                "press":"Z",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":-5
                },
                "highlight":true
            },
            {
                "shape":[
                    {
                        "x":2,"y":0,"z":0
                    },
                    {
                        "x":2,"y":8,"z":0
                    },
                    {
                        "x":4,"y":8,"z":0
                    },
                    {
                        "x":4,"y":16,"z":0
                    }
                ]
            }
        ]
    },
    {
        "index":15,
        "title":"Making an Aggressive Cut",
        "src":"https://drive.google.com/file/d/1Kl8mL5F-WPkJprA1jA3pvK8afVBku-50/preview",
        "text":"The previous section demonstrated a few conservative cuts using a depth of cut of 0.03 inches. If you need to remove a lot of material, it can go faster if you use a more aggressive depth of cut, like 0.1 inches. Let's take a look at a depth of cut of 0.1 inches to see what it looks like.<br>It seemed to work fine without any problems. However, keep in mind that if you use a depth of cut that is too deep, there is a risk of breaking the cutting tool. For this reason, the largest depth of cut that you should ever use is 0.1 inches of diameter at once.<br><hr><strong>Your turn. On the simulation to the right:</strong><br>Cut out the following shape:<br><img src='res/imgs/goto_shape.png' width=100%>1. Set a GoTo position of x = 5 in. and z = -5 in. The cutting tool will not be able to move further than these coordinates.<br>2. Do NOT exit the GoTo function interface or the desired GoTo position will no longer be held and you will have to rest.<br>3. As shown in the video, progressively cut out the material up to this position by moving the cutting tool. The lathe must be turned on before cutting, which can be done by pressing the FWD button.<br>4. You will now be able to make a depth of cut of 3. Notice how much faster you are able to cut out the material with an aggressive cut.  Note that too aggressive of a depth of cut can potentially damage the material.<br>5. Press submit (you will only be able to proceed once the proper shape has been cut out).",
        "tasks":[
            {   // TODO: Possibly add GoTo checks like in previous here as well
                "shape":[
                    {
                        "x":2,"y":0,"z":0
                    },
                    {
                        "x":2,"y":8,"z":0
                    },
                    {
                        "x":4,"y":8,"z":0
                    },
                    {
                        "x":4,"y":16,"z":0
                    }
                ]
            },
        ]
    },
    {
        "index":16,
        "title":"Conclusion",
        "text":"Congratulations! You have completed the lathe tutorial course!"
    }
];
