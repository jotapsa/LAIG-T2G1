/**
* @constructor CameraAnimation
*
*/
class CameraAnimation extends Animation{
  constructor(scene, startPerspective, finalPerspective, speed){
    super(scene, speed);
    this.startPerspective = startPerspective;
    this.finalPerspective = finalPerspective;

    this.targetCenter = midPoint(this.startPerspective.direction, this.finalPerspective.direction);
    this.positionCenter = midPoint(this.startPerspective.position, this.finalPerspective.direction);

    this.targetRadius = distance(this.targetCenter, this.finalPerspective.direction);
    this.positionRadius = distance(this.positionCenter, this.finalPerspective.position);

    this.length = Math.PI * this.positionRadius;
    this.expectedTime = this.length / this.speed;
  }

  update(deltaTime){
    this.elapsedTime += deltaTime;
  }
}
