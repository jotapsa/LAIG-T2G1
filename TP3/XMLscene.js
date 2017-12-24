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

    this.selectedShader = new CGFshader(this.gl, "shaders/selected.vert", "shaders/selected.frag");

    //So we can bind a texture to the shader
    this.selectedShader.setUniformsValues({
      uSampler: 1,
      uSampler2: 2
    });

    this.theme = THEME.LEGACY;

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
  this.cameraConfig = {
    fov: 0.4,
    near: 0.1,
    far: 500
  }

  this.cameraPerspectives = {
    "Blacks Player": new CameraPerspective(vec3.fromValues(0, 15, 15), vec3.fromValues(0, 0, 0)),
    "Whites Player": new CameraPerspective(vec3.fromValues(0, 15, -15), vec3.fromValues(0, 0, 0)),
    "Neutral": new CameraPerspective(vec3.fromValues(0, 15, 0), vec3.fromValues(0, 0, 0))
  }
  this.perspective = "Blacks Player";

  this.cameraAnimationSpeed = 10;
  this.cameraAnimation = null;

  this.camera = new CGFcamera(this.cameraConfig["fov"],this.cameraConfig["near"],this.cameraConfig["far"],
    this.cameraPerspectives[this.perspective].position,this.cameraPerspectives[this.perspective].target);
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

    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addCameraGroup();
    this.interface.addConfigurationGroup();
    this.interface.addGameOptions();
}

XMLscene.prototype.handlePicking = function(){
  if (this.pickMode == false){
    for (let picked of this.pickResults){
      if(picked[0]){
        console.log("ID: " + picked[1]);
        this.game.picked(picked[1]);
      }
    }
    this.pickResults.splice(0,this.pickResults.length);
  }
}

/**
* Displays the scene.
*/
XMLscene.prototype.display = function() {
  // ---- BEGIN Background, camera and axis setup

  // Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  // Initialize Model-View matrix as identity (no transformation
  this.updateProjectionMatrix();
  this.loadIdentity();

  this.handlePicking();
  this.clearPickRegistration();

  // Apply transformations corresponding to the camera position relative to the origin
  this.applyViewMatrix();

  this.pushMatrix();

  if (this.graph.loadedOk){
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
  else{
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

  this.selectedShader.setUniformsValues({
    timeFactor: this.timeFactor
  });

  this.updateCamera(deltaTime);

  let anim = this.graph.updateNode(this.graph.nodes[this.graph.idRoot], deltaTime);

  if(!anim && this.resetAnimation){
    this.graph.resetAnimations(this.graph.nodes[this.graph.idRoot]);
  }
}

XMLscene.prototype.changeCameraPerspective = function(){
  this.cameraAnimation = new CameraAnimation(this, this.camera, this.cameraPerspectives[this.perspective], this.cameraAnimationSpeed);
}

/**
 * @method 	updateCamera
 * @param	{int}	deltaTime	delta since the last time there was an update
 *
 */

XMLscene.prototype.updateCamera = function(deltaTime){
  if(this.cameraAnimation == null){
    return;
  }

  if(this.cameraAnimation.isDone()){
    return;
  }

  this.cameraAnimation.update(deltaTime);
  this.camera.setPosition(this.cameraAnimation.position);
  this.camera.setTarget(this.cameraAnimation.target);
}
