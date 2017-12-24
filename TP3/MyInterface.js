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

MyInterface.prototype.addCameraOptions = function(){
  var self = this; //maintain reference to the original this in a change of context
  let cameraController = this.gui.add(this.scene, 'perspective', Object.keys(this.scene.cameraPerspectives)).name('Perspective');
  cameraController.onChange(function(){
    self.scene.changeCameraPerspective();
  });
}

MyInterface.prototype.addConfigurationGroup = function() {
  var configGroup = this.gui.addFolder("Configuration");
  configGroup.open();

  configGroup.add(this.scene.game, 'gameMode', {
       'Human vs Human': GAMEMODE.HUMAN_VS_HUMAN,
       'Human vs CPU': GAMEMODE.HUMAN_VS_CPU,
       'CPU vs CPU': GAMEMODE.CPU_VS_CPU,
   }).name('Game Mode');

   configGroup.add(this.scene.game, 'dificulty', {
     'Easy': DIFICULTY.EASY,
     'Medium': DIFICULTY.MEDIUM,
     'Hard': DIFICULTY.HARD,
     'Impossible': DIFICULTY.IMPOSSIBLE,
   }).name('Dificulty');

   configGroup.add(this.scene, 'theme', {
        'SSE Legacy ': THEME.LEGACY,
        'Normal Small Star Empires': THEME.NORMAL
    }).name('Theme');
}
