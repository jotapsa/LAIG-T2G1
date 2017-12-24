/**
* @constructor CameraAnimation
*
*/
class CameraAnimation extends Animation{
  constructor(scene, startPerspective, finalPerspective, speed){
    super(scene, speed);
    this.startPerspective = startPerspective;
    this.finalPerspective = finalPerspective;

    this.targetCenter = midPoint(this.startPerspective.target, this.finalPerspective.target);
    this.positionCenter = midPoint(this.startPerspective.position, this.finalPerspective.position);

    this.targetRadius = distance(this.targetCenter, this.finalPerspective.target);
    this.positionRadius = distance(this.positionCenter, this.finalPerspective.position);

    this.length = Math.PI * this.positionRadius;
    this.expectedTime = this.length / this.speed;

    this.resetAnimation();
  }

  update(deltaTime){
    //If the animation is already complete, just return.
    if (this.isDone()){
      return ;
    }

    this.elapsedTime += deltaTime/1000;

    this.cameraAngle = Math.PI * this.elapsedTime/this.expectedTime;

    this.currTarget = [
      this.targetCenter[0] + this.targetRadius*Math.sin(this.cameraAngle),
      this.targetCenter[1],
      this.targetCenter[2] + this.targetRadius*Math.cos(this.cameraAngle),
    ];

    this.currPos = [
      this.positionCenter[0] + this.positionRadius*Math.sin(this.cameraAngle),
      this.positionCenter[1],
      this.positionCenter[2] + this.positionRadius*Math.cos(this.cameraAngle),
    ];

    if (this.elapsedTime >= this.expectedTime) {
        this.done=true;
    }
    deltaTime = deltaTime /1000;
  }

  resetAnimation(){
    this.elapsedTime = 0;
    this.cameraAngle = Math.PI * this.elapsedTime/this.expectedTime;

    this.currTarget = [
      this.targetCenter[0] + this.targetRadius*Math.sin(this.cameraAngle),
      this.targetCenter[1],
      this.targetCenter[2] + this.targetRadius*Math.cos(this.cameraAngle),
    ];

    this.currPos = [
      this.positionCenter[0] + this.positionRadius*Math.sin(this.cameraAngle),
      this.positionCenter[1],
      this.positionCenter[2] + this.positionRadius*Math.cos(this.cameraAngle),
    ];

    this.done = false;
  }

  /**
   * Creates a new Camera Animation from the current parameters.
   * @return {CameraAnimation} A Camera Animation that is a clone of this one.
   */
  clone() {
      return new CameraAnimation(this.scene, this.startPerspective, this.finalPerspective, this.speed);
  }

}
