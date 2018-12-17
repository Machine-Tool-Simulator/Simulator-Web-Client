// TODO: organize this file with the other (the other is the original)
let videos = [
    {
        "index":1,
        "title":"Introduction",
        "src":"https://drive.google.com/file/d/170xPqHaD2Rx57sdlq5Stm0qS5uytzwKI/preview",
        "text":""
    },
    {
        "index":2,
        "title":"Timelapse",
        "src":"https://drive.google.com/file/d/17_yJl_WwA8M96-jbezJe4RkUmAfHhblS/preview",
        "text":""
    },
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
        "text":""
    },
    {
        "index":5,
        "title":"Loading the Chuck",
        "src":"https://drive.google.com/file/d/1HrxZ9SqB2KShmBVlPgYjOfM85qTbjMZv/preview",
        "text":""
    },
    {
        "index":6,
        "title":"Turning on the Spindle",
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
        "index":7,
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
        "index":8,
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
        "index":9,
        "title":"X and Z Coordinate System",
        "src":"https://drive.google.com/file/d/16Rsc90nUyvINQ9UJZ2UkgVNnxIpS3HgM/preview",
        "text":""
    },
    {
        "index":10,
        "title":"X and Z Wheels",
        "src":"https://drive.google.com/file/d/1FEJn5YMX92adnGUo_1J9pwTq7wtuexuF/preview",
        "text":""
    },
    {
        "index":11,
        "title":"Fine and Coarse Control",
        "src":"https://drive.google.com/file/d/1TZXP9VHU0nqVB3r-EOS4hV4QHJY348zE/preview",
        "text":""
    },
    {
        "index":12,
        "title":"Cutting and Setting Z Coordinate System",
        "src":"https://drive.google.com/file/d/1dDJ7XO4W8aN-Pj1l3LGL1pc-x0nCljBI/preview",
        "text":""
    },
    {
        "index":13,
        "title":"Setting X Coordinate System",
        "src":"https://drive.google.com/file/d/1mQvL8J2SCZp_3jK0jatF4MdY9ZFBpCGV/preview",
        "text":""
    },
    {
        "index":14,
        "title":"Making an Aggressive Cut",
        "src":"https://drive.google.com/file/d/1Kl8mL5F-WPkJprA1jA3pvK8afVBku-50/preview",
        "text":""
    },
    {
        "index":15,
        "title":"Setting a GoTo Position",
        "src":"https://drive.google.com/file/d/11gcfT-G8VW5DYYKOnr7Gkb_U9WXfTPDL/preview",
        "text":""
    },
    {
        "index":16,
        "title":"Do One (Taper)",
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
        "index":17,
        "title":"Power Feed",
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
                "press":"INC_SET",
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
        "index":18,
        "title":"Return Home",
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
        "index":19,
        "title":"Set Tool Number",
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
        "index":20,
        "title":"Conclusion",
        "text":"[Insert conclusion]",
    },
    {
        "index":21,
        "title":"Advanced Practice",
        "text":"[Insert instructions]",
    }
];