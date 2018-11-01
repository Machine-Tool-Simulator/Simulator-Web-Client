// TODO: remove this file
let videos = [
    {
        "index":1,
        "title":"Lathe Introduction and Safety",
        "src":"https://drive.google.com/file/d/1q-yXx55mwrmt6_tKPmrwYlV8GqNoNNRa/preview",
        "text":"Hello. This tutorial is meant to provide you with basic instruction on the six CNC lathes that we have here in the shop. If your component is cylindrically symmetric, a lathe is probably the machine that you will use to manufacture it.<br>The safety rules for the rest of the shop apply to the lathes as well.<br>1. Always wear safety glasses and a hat when operating any machinery in the shop.<br>2. However there are a few additional precautions that need to be taken when operating a lathe. First, make sure there are no loose items on your body that can get caught in the machine this includes items like watches bracelets necklaces and especially hair<br>3. The lathe will be spinning very fast during manufacturing and there are several protrusions on the lathe which can catch on hair and clothing. Never reach or lean into the work area when the machine is running.<br>4. In addition loading and unloading parts in the Chuck requires using a small square wrench to tighten the jaws. Never under any circumstances leave this wrench in the Chuck, not even for a moment. If the lane has accidentally started while the wrench is in the Chuck, the wrench will be flung out of the machine and could cause serious injury.<br>These are just some of the main safety concerns with the lathe there are others. Before using the lathe on your own, you will need to be trained by one of the shop staff."
    },
    {
        "index":2,
        "title":"Main Lathe Features",
        "src":"https://drive.google.com/file/d/1IHgYYpeR5K5eisdGgXx3MwMpbn-xiD0Y/preview",
        "text":"There are three main features located inside the lathes workspace:<br>1. The chuck<br>2. The carriage<br>3. And the tailstock<br>The Chuck is used to hold the components in place during manufacturing.<br>The carriage pulls a single point tool and is moved around the component to achieve the desired shape.<br>Lastly, the tailstock is used for drilling holes in the center of the part and for stabilizing long thin parts during machining."
    },
    {
        "index":3,
        "title":"Digital Readout",
        "src":"https://drive.google.com/file/d/1ZF2dHnq0NpgBNq0NZqUyYM3SWh4oEMje/preview",
        "text":"The control panel for the lathe has six options, which can be accessed by pressing the mode button:<br>1. digital readout or DRO<br>2. program<br>3. edit<br>4. setup<br>5. run<br>6. and program in out<br>For basic operation, the only mode you will need is DRO. The last five functions are used for programming the CNC functions of the lathe and will be covered in later tutorials.<br>In DRO mode, the carriage can be moved with the control wheels on the front of the lathe. The left wheel controls the axial motion the z-axis, while the right wheel controls the radial motion the x-axis. Note that the value of the x position is always given as a diameter, not at a radius, so for every inch the carriage moves in the X direction, the value of the x-position will change by two inches. This might seem counterintuitive, but since the diameter is much easier to measure than a radius, it will make the manufacturing process much easier.<br>The carriage can also be moved rapidly with a jog handle between the wheels, but be careful not to run the tool into the Chuck while jogging, and never jog when the tool is in contact with the work piece."
    },
    {
        "index":4,
        "title":"Turning on Spindle",
        "src":"https://drive.google.com/file/d/1XJ0k4MLwRJvKNz54EUKnh9AzjP2tWtzI/preview",
        "text":"To turn the spindle on, press the forward button on the spindle control. The speed can be controlled with the spindle speed button.<br>-----<br><strong>Your turn. On the console to the right:</strong><br>1. Press the \"FWD\" button on the control to turn on the spindle.<br>2. Press the \"OFF\" button on the control to turn off the spindle.",
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
        "index":5,
        "title":"Constant RPM",
        "src":"https://drive.google.com/file/d/1SmuPAJPo4dQPUxLYRslcIwyyc7k5JbUD/preview",
        "text":"There are two ways to specify the spindle speed. Pressing \"INC SET\" will specify a constant RPM and pressing \"ABS SET\" will specify a constant SFM. Constant RPM will spin the spindle at a constant number of revolutions per minute no matter where the tool is.<br>-----<br><strong>Your turn. On the console to the right:</strong><br>1. Select \"SPIN SPEED\" using the button below the control screen to set RPM.<br>2. Enter \"500\" as the value using the numeric keypad.<br>3. Press the \"INC SET\" button to set constant RPM.",
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
        "index":6,
        "title":"Constant SFM",
        "src":"https://drive.google.com/file/d/1jnq_N92G--HP1bjzjdfzLLCaSHbjOfe3/preview",
        "text":"Constant SFM will adjust the RPM of the spindle depending on the tools radial position to maintain a constant linear velocity of the tool relative to the surface of the material. This puts less stress on the tool and leaves a nicer finish.</br>-----</br><strong>Your turn. On the console to the right:</strong></br>1. Select \"Spin Speed\" using the button below the control screen to set RPM </br>2. Enter \"250\" as the value using the numeric keypad.</br>3. Press the \"ABS SET\" button to set constant SFM.",
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
        "index":7,
        "title":"Fine/Coarse Feed Options",
        "src":"https://drive.google.com/file/d/10MDHe6ZNo-oa9aeP8XWQec9a2LAXoJRV/preview",
        "text":"You can also adjust the speed of the carriage moves with a fine and coarse speed button. When the core speed option is selected, every turn of the handle will adjust the position by 0.8 inches. Selecting fine feed will reduce the feed to point to 0.2 inches.</br>-----</br><strong>Your turn. On the console to the right:</strong></br>1. Switch the lathe from fine to coarse control by selecting \"F/C\" on the keypad.</br>Switch the lathe back from coarse to fine control by selecting \"F\" on the keypad.",
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
        "index":8,
        "title":"Goto",
        "src":"https://drive.google.com/file/d/1fdcB7Q7nfVFgnMmRiMPyPNK9acDC8Gq0/preview",
        "text":"In DRO mode, there are some options to assist manual machining. The go-to lets you move rapidly from one position to another. Set the position by entering go to load, selecting the coordinate of interest, entering the desired value, and pressing \"ABS SET.\" Now when the wheel or jog handle is engaged the carriage will move up to but not beyond the set positions. Exiting out of this mode will negate this feature.</br></br><strong>Your turn. On the console to the right:</strong></br>1. Select \"GO TO\" using the button below the control screen.</br>2. Select the \"X\" button to indicate that the go to coordinate will be in the x-direction.</br>3. Enter \"3\" as the desired x-value.</br>4. Select \"ABS SET\" to set the go to value.</br>5. Exit \"GO TO\" mode by selecting \"TOOL # (RETURN)\" using the button below the control screen.",
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
                    "buffer":3
                },
                "highlight":true
			},
            {
                "press":"TOOLRET",
                "highlight":true
            }
        ]
    },
    {
        "index":9,
        "title":"Do one",
        "src":"https://drive.google.com/file/d/1hsq86aOGg1iudqzyXNDVVQl6JtBGRhrB/preview",
        "text":"Do one allows features like tapered angles and corner radii to be machined. When one of the do one options is selected and specified the Z&amp;X wheels are disabled and instead made to control the coarse and fine feed of the path specified by the do one feature.</br></br><strong>Your turn. On the console to the right:</strong></br>1. Press the \"FWD\" button on the control to turn on the spindle.</br>2. Select \"DO ONE\" using the button below the control screen.</br>3. Select \"(TAPER)\" using the button below the control screen.</br>4. Select \"ABS SET\" to execute the \"DO ONE\" feature.</br>5. Exit \"DO ONE\" mode by selecting \"TOOL # (RETURN)\" using the button below the control screen.</br>6. Press the \"OFF\" button on the control to turn off the spindle.",
        "tasks":[
            {
                "press":"FWD",
                "highlight":true
            },
            {
                "press":"DOONE",
                "highlight":true
            },
            {
                "press":"TAPER",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "highlight":true
            },
            {
                "press":"TOOLRET",
                "highlight":true
            },
            {
                "press":"OFF",
                "highlight":true
            }
        ]
	},
    {
        "index":10,
        "title":"Power feed",
        "src":"https://drive.google.com/file/d/1tWIUTssDx2n-iAmm5j608SQRxRY96Ii6/preview",
        "text":"Power feed can be used to move the carriage at a constant rate in one direction. The direction and distance of motion is specified with the inc key while the speed can be set in inches per minute or inches per revolution with the feed speed arrows. Note that the machine door must be closed to engage the power feed, as it must be during any operation where the carriage will be moved under computer control.</br></br><strong>Your turn. On the console to the right:</strong></br>1. Press the \"FWD\" button on the control to turn on the spindle.</br>2. Select \"POWER FEED\" using the button below the control screen.</br>3. Select the \"Z\" button to indicate that the power feed will be in the z-direction.</br>4. Enter \"-1\" as the value for the power feed (click the number 1 and then use the \"+/-\" button to enter a negative value).</br>5. Select \"INC SET\" to set the power feed.</br>6. Press the \"OFF\" button on the control to turn off the spindle.",
        "tasks":[
            {
                "press":"FWD",
                "highlight":true
            },
            {
                "press":"POWERFEED",
                "highlight":true
            },
            {
                "press":"Z",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":-1
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
        "index":11,
        "title":"Return home",
        "src":"https://drive.google.com/file/d/1zP_OjZrycEvLBUMsyqBJ3aP8Rr2RzORD/preview",
        "text":"Go home returns the machine to the home position, which can be set in the setup menu. Again, the machine door must be closed in order for this feature to function.</br></br><strong>Your turn. On the console to the right:</strong></br>1. Select \"RETURN HOME\" using the button below the control screen.</br>2. Select \"GO\" under feed to return the tool to the home position.",
        "tasks":[
            {
                "press":"RETURNHOME",
                "highlight":true
            },
            {
                "press":"GO",
                "highlight":true
            }
        ]
    },
    {
        "index":12,
        "title":"Tool number",
        "src":"https://drive.google.com/file/d/1DSntmr1vDUYpFi8cDyWbpc2DSOLgIKiw/preview",
        "text":"Tool number allows you to switch between the various tools that you have programmed into the tool table. Since each tool has a different size you will have different x and z values for a given carriage position.</br></br><strong>Your turn. On the console to the right:</strong></br>1. Select \"TOOL\" using the button below the control screen.</br>2. Select tool 1 by entering \"1\" on the keypad.</br>Select \"ABS SET\" to enter the tool.",
        "tasks":[
            {
                "press":"TOOLRET",
                "highlight":true
            },
            {
                "press":"ABS_SET",
                "conditions":{
                    "buffer":1
                },
                "highlight":true
            }
        ]
    },
    {
        "index":13,
        "title":"Chuck",
        "src":"https://drive.google.com/file/d/1bNr31I9RFK3Ch8rOG_SIuMF6Ggi9QyJk/preview",
        "text":"To load a component in the machine open the jaws with the Chuck wrench and place the component in the Chuck. Then tighten the jaws about the part. If you are working with a small diameter component, you can use a collet to secure the part instead. Collets are available in standard sizes up to one inch in the drawers next to each lathe.</br>To load a collet align the groove in the collet threads with the alignment screw in the Chuck. Then while applying pressure to the collet, tighten the wrench until the threads catch. Insert your part into the collet and then tighten the Chuck until the collet is secure.",
    },
    {
        "index":14,
        "title":"X Zero Demo",
        "src":"https://drive.google.com/file/d/1vP4tao9LjsF_8KSq-y5N5Iv5cLZq4cRu/preview",
        "text":"A quick way to zero the tool in either direction is to bring the tool near the part and then use a piece of paper to detect when the tool comes in contact. You can then set the X or Z position by pressing X or Z and entering the known value. This is a useful technique because it does not require any material to be removed from the part. However, if a truly accurate position is required, you will need to make a new cut in the component and measure its true dimensions.</br>To do this turn the machine on and remove a small amount of material. Then back the tool off the part without changing the dimensions you were trying to measure. Turn the spindle off and measure the true size of the cut which you have just made with a pair of micrometers. Enter the measured value of the new cut into the computer.",
    },
	{
        "index":15,
        "title":"End",
        "src":"https://drive.google.com/file/d/1x1V_azN_2QspTQOpdeY2PmlUX2QXsQ1h/preview",
        "text":"Once you have zeroed your tool, you can use the control wheels, power feed, and the do one feature to machine a wide variety of shapes. For complicated shapes, however, it'll be easier to program the machine to run a cycle.",
    }
];