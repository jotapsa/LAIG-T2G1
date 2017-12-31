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
 * Reset All GUI Folders and Items.
 */
MyInterface.prototype.ResetGUI = function() {
    this.gui.destroy();
    this.gui = new dat.GUI();
}

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {
    var group = this.gui.addFolder("Lights");
    group.close();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    this.scene.lightValues = {};
    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

/**
 * Adds a folder containing the cameras perspectives.
 */
MyInterface.prototype.addCameraGroup = function(){
  var self = this; //maintain reference to the original this in a change of context
  var cameraGroup = this.gui.addFolder("Camera");
  cameraGroup.open();

  let cameraController = cameraGroup.add(this.scene, 'perspective', Object.keys(this.scene.cameraPerspectives)).name('Perspective');
  cameraController.onChange(function(){
    self.scene.changeCameraPerspective();
  });

  cameraGroup.add(this.scene, 'cameraAnimationSpeed', 1, 20);
}

/**
 * Adds a folder containing the save/load/clear games.
 */
MyInterface.prototype.addManageGamesGroup = function(){
  var self = this; //maintain reference to the original this in a change of context
  var manageGamesGroup = this.gui.addFolder("Manage Games");
  manageGamesGroup.open();

  manageGamesGroup.add(this.scene, 'gameName').name('Name of Game').listen();
  manageGamesGroup.add(this.scene, 'saveGame').name('Save Game');

  if (window.localStorage.hasOwnProperty('gameList')){
    this.scene.games = JSON.parse(window.localStorage['gameList']);
    this.scene.savedGames = Object.values(this.scene.games).length;
  }

  let loadGame = manageGamesGroup.add(this.scene, 'selectedGame', Object.values(this.scene.games) ).name('Load Game');
  loadGame.onChange(function(){
    self.scene.loadGame();
  });
  manageGamesGroup.add(this.scene, 'clearGames').name('Clear All Games');
}

/**
 * Adds a folder containing the configuration of DraughtGame.
 */
MyInterface.prototype.addConfigurationGroup = function(){
  var self = this; //maintain reference to the original this in a change of context
  var configGroup = this.gui.addFolder("Configuration");
  configGroup.open();

  let whitesController = configGroup.add(this.scene.game, 'whitesOwner', {
       'Human': OWNER.HUMAN,
       'CPU': OWNER.CPU,
   }).name('Whites');
   whitesController.onChange(function(){
     self.scene.initInterface();
   });

   let blacksController = configGroup.add(this.scene.game, 'blacksOwner', {
        'Human': OWNER.HUMAN,
        'CPU': OWNER.CPU,
    }).name('Blacks');
    blacksController.onChange(function(){
      self.scene.initInterface();
    });
    if(this.scene.game.whitesOwner != OWNER.HUMAN || this.scene.game.blacksOwner != OWNER.HUMAN){
      configGroup.add(this.scene.game, 'depth', 4, 10).name('CPU Depth');
    }

    let timeController = configGroup.add(this.scene.game, 'turnTimeLimited').name('Limit Turn Time');
    timeController.onChange(function(){
      self.scene.initInterface();
    })
    if(this.scene.game.turnTimeLimited == true){
      configGroup.add(this.scene.game, 'timeForTurn', 20, 120).name('Time Limit');
    }

    let themeController = configGroup.add(this.scene, 'theme', Object.keys(this.scene.themes)).name('Theme');
    themeController.onChange(function(){
      self.scene.loadGraph();
    });
}

/**
 * Adds a folder containing the DraughtGame options like undoMove,resetGame and replayGame.
 */
MyInterface.prototype.addGameOptions = function(){
  this.gui.add(this.scene.game, 'undoMove').name('Undo Move');
  this.gui.add(this.scene, 'resetGame').name('Reset Game');
  this.gui.add(this.scene.game, 'replayGame').name('Replay Game');
}
