/**
 * LinearAnimation
 * @constructor
 */
class LinearAnimation extends Animation {
    constructor(scene,controlPoints,speed) {
      super(scene);
      this.CPoints = controlPoints;
      this.speed = speed;
    }
}
