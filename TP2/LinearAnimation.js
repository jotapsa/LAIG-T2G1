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
    update(){

      if (this.elapsedTime >= this.expectedTime) {
          this.updateState();
      }
    }

    /**
     * Applies the transformations according to the current state of the animation.
     */
    display(){
      this.scene.translate(this.position[X], this.position[Y], this.position[Z]);
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.angleXZ = 0;
      this.angleYZ = 0;
      this.currentPointIndex = 1;
      this.position = this.CPoints[0];

      this.updateAnimation();
    }

    /**
     * Updates the animation when a new control point has been reached.
     */
    updateState(){
      if (this.currentPointIndex<this.CPoints.length){
        this.currentPointIndex++;
      }
    }

    /**
    * Updates animation's angles, direction
    */
    updateAnimation(){
      this.elapsedTime = 0;
      this.expectedTime = distance(this.CPoints[currentPointIndex-1], this.CPoints[currentPointIndex])/this.speed;


      //How much the animation moves per second
      this.direction = divVector(subtractPoints(this.CPoints[currentPointIndex-1], this.CPoints[currentPointIndex]), this.speed);

      //this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
      //this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }
}
