var L1=0;
var L2=1;
var L3=2;
var L4=3;
var R1=4;
var R2=5;
var R3=6;
var R4=7;

/**
 * BezierAnimation
 * @constructor
 */
class BezierAnimation extends Animation {
    constructor(scene,controlPoints,speed) {
      super(scene, speed);
      this.CPoints = controlPoints;
      console.log(controlPoints.length);

      this.casteljau = deCasteljau (this.CPoints);
      this.curveLength = distance (this.casteljau[L1], this.casteljau[L2]) + distance (this.casteljau[L2], this.casteljau[L3]) + distance (this.casteljau[L3], this.casteljau[L4]) +
        distance (this.casteljau[R1], this.casteljau[R2]) + distance (this.casteljau[R2], this.casteljau[R3]) + distance (this.casteljau[R3], this.casteljau[R4]);
      this.expectedTime = this.curveLength / this.speed;

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

      for (let i=0; i<3; i++){
        this.position[i] = Math.pow((1-this.elapsedTime),3)*this.CPoints[0][i]+
          3*this.elapsedTime*Math.pow((1-this.elapsedTime),2)*this.CPoints[1][i]+
          3*Math.pow(this.elapsedTime,2)*(1-this.elapsedTime)*this.CPoints[2][i]+
          Math.pow(this.elapsedTime,3)*this.CPoints[3][i];
      }

      if (this.elapsedTime >= this.expectedTime) {
          this.done=true;
      }

    }

    /**
     * Applies the transformations according to the current state of the animation.
     */
    display(){
      this.scene.translate(this.position[X], this.position[Y], this.position[Z]);

      //rotate
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.elapsedTime = 0;
      this.position = this.CPoints[0];
      this.done = false;
    }
}
