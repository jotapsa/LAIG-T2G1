/**
* Animation
* @constructor
*/
class Animation {
  constructor(scene, speed){
    this.scene = scene;
    this.speed = speed || 0;

    //Get the time in ms so we can update the clock relatively to this
  	var d = new Date();
  	this.oldCurrTime = d.getTime();

    this.done = false;
  }

  /**
   * Returns whether the animation is done or not.
   * @return {Boolean} True if the animation is done. False otherwise.
   */
  isDone() {
      return this.done;
  }
}
