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
    }

    update(){

    }

    display(){

    }
}
