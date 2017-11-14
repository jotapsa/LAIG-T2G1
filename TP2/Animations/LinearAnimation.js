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
      this.elapsedTime += deltaTime;

      this.position = addPoints (this.position, multVector(this.direction, deltaTime/1000));

      if (this.elapsedTime >= this.expectedTime) {
          this.updateState();
      }
    }

    /**
     * Returns the transformationMatrix according to the current state of the animation.
     */
    getTransformMatrix(){
      
      mat4.identity(this.transformMatrix);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.position[X], this.position[Y], this.position[Z]]);
      mat4.rotate(this.transformMatrix, this.transformMatrix,this.angleXZ, this.axisCoords['y']);
      mat4.rotate(this.transformMatrix, this.transformMatrix,this.angleYZ, this.axisCoords['x']);

      return this.transformMatrix();
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
      this.expectedTime = distance(this.CPoints[this.currentPointIndex-1], this.CPoints[this.currentPointIndex])/this.speed;

      this.position = this.CPoints[this.currentPointIndex-1];
      //How much the animation moves per second
      this.direction = divVector(subtractPoints(this.CPoints[this.currentPointIndex-1], this.CPoints[this.currentPointIndex]), this.speed);

      //this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
      //this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }

    /**
     * Creates a new Linear Animation from the current parameters.
     * @return {LinearAnimation} A Linear Animation that is a clone of this one.
     */
    clone() {
        return new LinearAnimation(this.scene, this.CPoints, this.speed);
    }
}
