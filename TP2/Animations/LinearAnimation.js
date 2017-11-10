var X = 0;
var Y = 1;
var Z = 2;

/**
 * LinearAnimation
 * @constructor
 */
class LinearAnimation extends Animation {
    constructor(scene,controlPoints,speed) {
      super(scene, speed);
      this.CPoints = controlPoints;

      if (this.CPoints.length>=2){
        this.currentPointIndex = 1;
      }
      else{
        throw new Error('CPoints vector has invalid length.');
      }

      this.resetAnimation();
    }

    /**
     *
     */
    update(currTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return ;
      }

      var deltaTime = currTime - this.oldCurrTime;
      this.oldCurrTime = currTime;

      this.position = addPoints (this.position, multVector(this.direction, deltaTime/1000));

      this.elapsedTime += deltaTime/1000;

      if (this.elapsedTime >= this.expectedTime) {
          this.updateState();
      }
    }

    /**
     * Applies the transformations according to the current state of the animation.
     */
    display(){
      this.scene.translate(this.position[X], this.position[Y], this.position[Z]);
      this.scene.rotate(this.angleXZ, 0, 1, 0);
      this.scene.rotate(this.angleYZ, 1, 0, 0);
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.angleXZ = 0;
      this.angleYZ = 0;
      this.currentPointIndex = 1;
      this.position = this.CPoints[0];
      this.done = false;

      this.updateAnimation();
    }

    /**
     * Updates the animation when a new control point has been reached.
     */
    updateState(){
      //this.CPoints has .length number of points, starting at 0
      if (this.currentPointIndex < (this.CPoints.length-1)){
        this.currentPointIndex++;
      }else {
        this.done = true;
      }

      this.updateAnimation();
    }

    /**
    * Updates animation's angles, direction
    */
    updateAnimation(){
      this.elapsedTime = 0;
      //expectedTime in seconds
      this.expectedTime = (distance(this.CPoints[this.currentPointIndex-1], this.CPoints[this.currentPointIndex])/this.speed)/1000;

      this.position = this.CPoints[this.currentPointIndex-1];
      //How much the animation moves per second
      this.direction = divVector(subtractPoints(this.CPoints[this.currentPointIndex-1], this.CPoints[this.currentPointIndex]), this.speed);

      //this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
      //this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }
}
