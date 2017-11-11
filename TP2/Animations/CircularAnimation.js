var X = 0;
var Y = 1;
var Z = 2;

/**
 * CircularAnimation
 * @constructor
 */
class CircularAnimation extends Animation {
    constructor(scene,center,radius,startAngle,rotationAngle,speed) {
      super(scene, speed);
      this.center = center;
      this.radius = radius;
      this.startAngle = startAngle;
      this.rotationAngle = rotationAngle;
      this.expectedTime = (2*Math.PI*this.radius*(this.rotationAngle/360.0))/this.speed;
      this.angleSpeed = this.rotationAngle/this.expectedTime; // (angle/s)

      this.resetAnimation();
    }

    update(currTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return ;
      }

      var deltaTime = currTime - this.oldCurrTime;
      this.oldCurrTime = currTime;
      this.elapsedTime += deltaTime;

      this.currentRotAng += this.angleSpeed * (deltaTime/1000);

      if (this.elapsedTime >= this.expectedTime) {
          this.done=true;
      }
    }

    /**
     * Applies the transformations according to the current state of the animation.
     */
    display(){
      this.scene.translate(this.center[X], this.center[Y], this.center[Z]);
      this.scene.translate(this.radius*Math.cos(this.startAngle+this.currentRotationAngle), 0, this.radius*Math.sin(this.startAngle+this.currentRotationAngle));

      this.scene.rotate(Math.PI/2 + this.startAngle + this.currentRotationAngle, 0, 1, 0);
    }

    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.currentRotationAngle = 0;
      this.elapsedTime = 0;
      this.done = false;
    }

}
