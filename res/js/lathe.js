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
	   "text":"To turn the spindle on, press the forward button on the spindle control. The speed can be controlled with the spindle speed button.<br>-----<br>Your turn. On the console to the right:<br>Press the \"FWD\" button on the control to turn on the spindle.<br>Press the \"OFF\" button on the control to turn off the spindle.",
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
	   "text":"There are two ways to specify the spindle speed. Pressing \"INC SET\" will specify a constant RPM and pressing \"ABS SET\" will specify a constant SFM. Constant RPM will spin the spindle at a constant number of revolutions per minute no matter where the tool is.<br>-----<br>Your turn. On the console to the right:<br>Select \"SPIN SPEED\" using the button below the control screen to set RPM.<br>Enter \"500\" as the value using the numeric keypad.<br>Press the \"INC SET\" button to set constant RPM.",
	   "tasks":[
		  {
			 "select":"RPM",
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
	}
 ];