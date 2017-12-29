var X = 0;
var Y = 1;
var Z = 2;
var degToRad = Math.PI / 180.0;

/**
 * CircularAnimation
 * @constructor
 */
class CircularAnimation extends Animation {
    constructor(center,radius,startAngle,rotationAngle,speed) {
      super(speed);
      this.center = center;
      this.radius = radius;
      this.startAngle = startAngle;
      this.rotationAngle = rotationAngle;

      //expectedTime in seconds
      this.expectedTime = (2*Math.PI*this.radius*(Math.abs(this.rotationAngle)/360.0))/this.speed;
      this.angleSpeed = this.rotationAngle/this.expectedTime; // (angle/s)
      this.resetAnimation();
    }

    /**
     * Updates rotationAngle and elapsedTime according to the current state of the animation and deltaTime.
     */
    update(deltaTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return ;
      }

      this.elapsedTime += deltaTime/1000;
      this.currentRotationAngle += this.angleSpeed * (deltaTime/1000);

      if (this.elapsedTime >= this.expectedTime) {
          this.done=true;
      }
    }

    /**
     * Returns the transformationMatrix according to the current state of the animation.
     */
    getTransformMatrix(){
      mat4.identity(this.transformMatrix);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.center[X], this.center[Y], this.center[Z]]);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.radius*Math.cos((this.startAngle+this.currentRotationAngle)*degToRad), 0, this.radius*Math.sin((this.startAngle+this.currentRotationAngle)*degToRad)]);
      mat4.rotate(this.transformMatrix, this.transformMatrix, Math.PI/2 + (this.startAngle + this.currentRotationAngle)*degToRad, this.axisCoords['y']);

      return this.transformMatrix;
    }

    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.currentRotationAngle = 0;
      this.elapsedTime = 0;
      this.done = false;
    }

    /**
     * Creates a new Circular Animation from the current parameters.
     * @return {CircularAnimation} A Circular Animation that is a clone of this one.
     */
    clone() {
        return new CircularAnimation(this.center, this.radius, this.startAngle, this.rotationAngle, this.speed);
    }

}
