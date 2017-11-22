 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)

    this.gui.add(this.scene, 'currentFPS', this.scene.fpsList);

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.close();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addShaderGroup = function(selectableNodes) {
  var group = this.gui.addFolder("Shaders");
  group.open();

  list = {};
  list["None"] = -1;
  for(let i=0;i < selectableNodes.length; i++){
    list[selectableNodes[i]]= i;
  }

  group.add(this.scene, 'selectedNode',
    list
  ).name('Selected Node');

  group.add(this.scene, 'selectedColor',{
    'Red':0,
    'Green':1,
    'Blue':2,
    'Yellow':3,
    'Magenta':4,
    'Cyan':5,
  }).name('Color');
}

MyInterface.prototype.addAnimationsOptions = function(){
  var group = this.gui.addFolder("Animations");
  group.open();

  group.add(this.scene,'resetAnimation');
}
