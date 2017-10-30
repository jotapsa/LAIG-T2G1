/**
 * CircularAnimation
 * @constructor
 */
class CircularAnimation extends Animation {
    constructor(scene,center,radius,initialAngle,rotationAngle,speed) {
      super(scene);
      this.center = center;
      this.radius = radius;
      this.initialAngle = initialAngle;
      this.rotationAngle = rotationAngle;
      this.speed = speed;
    }
}
