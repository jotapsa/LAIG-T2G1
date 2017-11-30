/**
* Animation
* @constructor
*/
class Animation {
  constructor(scene, speed){
    this.scene = scene;
    this.speed = speed || 0;
    this.transformMatrix = mat4.create();

    this.axisCoords = [];
    this.axisCoords['x'] = [1, 0, 0];
    this.axisCoords['y'] = [0, 1, 0];
    this.axisCoords['z'] = [0, 0, 1];

    this.elapsedTime = 0;

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
