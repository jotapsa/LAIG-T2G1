/**
* @constructor CameraAnimation
*
*/
class CameraAnimation extends Animation{
  constructor(startPerspective, finalPerspective, speed){
    super(speed);
    this.startPerspective = startPerspective;
    this.finalPerspective = finalPerspective;

    this.length = distance(this.startPerspective.position, this.finalPerspective.position);
    this.expectedTime = this.length / this.speed;

    this.position = this.startPerspective.position.slice(0);
    this.direction = normalizeVector(subtractPoints(this.startPerspective.position, this.finalPerspective.position));

    this.target = this.startPerspective.target.slice(0);
    this.targetdirection = normalizeVector(subtractPoints(this.startPerspective.target, this.finalPerspective.target));

    this.resetAnimation();
  }

  update(deltaTime){
    //If the animation is already complete, just return.
    if (this.isDone()){
      return ;
    }

    this.elapsedTime += deltaTime/1000;
    this.position = addPoints(this.position, multVector(multVector(this.direction, this.speed),deltaTime/1000));
    this.target = addPoints(this.target, multVector(multVector(this.targetdirection, this.speed), deltaTime/1000));

    if (this.elapsedTime >= (this.expectedTime*0.95)) {
        this.done=true;
    }
  }

  resetAnimation(){
    this.elapsedTime = 0;
    this.position = this.startPerspective.position.slice(0);
    this.target = this.startPerspective.target.slice(0);

    this.done = false;
  }

  /**
   * Creates a new Camera Animation from the current parameters.
   * @return {CameraAnimation} A Camera Animation that is a clone of this one.
   */
  clone() {
      return new CameraAnimation(this.startPerspective, this.finalPerspective, this.speed);
  }

}
