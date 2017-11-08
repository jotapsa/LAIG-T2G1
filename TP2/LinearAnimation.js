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

      this.resetAnimation();
    }

    update(){

    }

    display(){
      this.scene.translate(this.position[X], this.position[Y], this.position[Z]);
    }

    resetAnimation(){
      this.angleXZ = 0;
      this.angleYZ = 0;

      this.currentPoint = this.CPoints[0];

      this.updateAnimation();
    }

    /**
    * Updates animation's angles, direction
    */
    updateAnimation(){
      this.elapsedTime = 0;
      this.expectedTime = distance(this.CPoints[0], this.CPoints[1])/this.speed;


      //How much the animation moves per second
      this.direction = divVector(subtractPoints(this.CPoints[0], this.CPoints[1]), this.speed);

      //this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
      //this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }
}
