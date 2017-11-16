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
    update(deltaTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return ;
      }

      this.elapsedTime += deltaTime/1000;

      this.position = addPoints (this.position, multVector(multVector(this.direction, this.speed), deltaTime/1000));
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
      //mat4.rotate(this.transformMatrix, this.transformMatrix,this.angleZX, this.axisCoords['y']);

      return this.transformMatrix;
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.angleZX = 0;
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
        this.position = this.CPoints[this.currentPointIndex];
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

      this.direction = normalizeVector(subtractPoints(this.CPoints[this.currentPointIndex-1], this.CPoints[this.currentPointIndex]));

      this.angleZX = Math.atan2(this.direction[X], this.direction[Z]);
    }

    /**
     * Creates a new Linear Animation from the current parameters.
     * @return {LinearAnimation} A Linear Animation that is a clone of this one.
     */
    clone() {
        return new LinearAnimation(this.scene, this.CPoints, this.speed);
    }
}
