var DEGREE_TO_RAD = Math.PI / 180;
var FPSToUpdate = 1000;


/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    this.FPS = 120;

    this.gameConfig = {
      gameMode : GAMEMODE.HUMAN_VS_HUMAN,
      theme : THEME.LEGACY,
    }

    this.game = new DraughtGame();

    this.setPickEnabled(true);
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);

    this.interface.addConfigurationGroup();
}

XMLscene.prototype.createMove = function(){
  this.startingPos, this.finalPos;

  if (this.pickMode == false){
    if (this.pickResults != null && this.pickResults.length > 0){
      for (let i=0; i< this.pickResults.length; i++){
        let x, y, id;
        if (this.pickResults[i][0]){
          id = this.pickResults[i][1];
          y = Math.floor(id / 8);
          x = id % 8;
          console.log ("Y: " + y + " X: " + x + " ID: " +id);
          if (this.startingPos == null){
            this.startingPos = [y, x];
          }
          else if (this.finalPos == null){
            this.finalPos = [y, x];
            new Move (this.startingPos, this.finalPos);
            this.startingPos = null;
            this.finalPos = null;
          }
        }
      }
      this.pickResults.splice(0,this.pickResults.length);
    }
  }

}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    this.createMove();
    this.clearPickRegistration();

    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}

    this.popMatrix();

    // ---- END Background, camera and axis setup

    this.setUpdatePeriod(FPSToUpdate/this.FPS);

    //Get the time in ms so we can update the clock relatively to this
  	var d = new Date();
  	this.oldCurrTime = d.getTime();
    this.timeFactor = Math.cos(this.oldCurrTime/10000);
}


/**
 * Updates the scene and animations.
 */
XMLscene.prototype.update = function (currTime){
  var deltaTime = currTime - this.oldCurrTime;
  this.oldCurrTime = currTime;
  this.timeFactor = Math.abs(Math.sin(this.oldCurrTime/1000));

  let anim = this.graph.updateNode(this.graph.nodes[this.graph.idRoot], deltaTime);

  if(!anim && this.resetAnimation){
    this.graph.resetAnimations(this.graph.nodes[this.graph.idRoot]);
  }
};
