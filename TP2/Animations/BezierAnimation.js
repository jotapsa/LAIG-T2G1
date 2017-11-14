var l1=0;
var l2=1;
var l3=2;
var l4=3;
var r1=4;
var r2=5;
var r3=6;
var r4=7;

/**
 * BezierAnimation
 * @constructor
 */
class BezierAnimation extends Animation {
    constructor(scene,controlPoints,speed) {
      super(scene, speed);
      this.CPoints = controlPoints;

      this.casteljau = deCasteljau (this.CPoints);
      this.curveLength = distance (this.casteljau[l1], this.casteljau[l2]) + distance (this.casteljau[l2], this.casteljau[l3]) + distance (this.casteljau[l3], this.casteljau[l4]) +
        distance (this.casteljau[r1], this.casteljau[r2]) + distance (this.casteljau[r2], this.casteljau[r3]) + distance (this.casteljau[r3], this.casteljau[r4]);
      //expectedTime in seconds
      this.expectedTime = this.curveLength / this.speed;
      console.log(this.expectedTime);
      this.resetAnimation();
    }

    update(currTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return ;
      }

      var deltaTime = currTime - this.oldCurrTime;
      this.oldCurrTime = currTime;
      this.elapsedTime += deltaTime/1000;

      //since in Bezier curves 0 >= t >= 1
      this.t=this.elapsedTime/this.expectedTime;
      console.log(this.t);
      for (let i=0; i<3; i++){
        this.position[i] = Math.pow((1-this.t),3)*this.CPoints[0][i]+
          3*this.t*Math.pow((1-this.t),2)*this.CPoints[1][i]+
          3*Math.pow(this.t,2)*(1-this.t)*this.CPoints[2][i]+
          Math.pow(this.t,3)*this.CPoints[3][i];
      }
      console.log (this.position);

      if (this.elapsedTime >= this.expectedTime) {
          this.done=true;
      }

    }

    /**
     * Returns the transformationMatrix according to the current state of the animation.
     */
    getTransformMatrix(){
      mat4.identity(this.transformMatrix);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.position[X], this.position[Y], this.position[Z]]);

      return this.transformMatrix;
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.elapsedTime = 0;
      this.position = this.CPoints[0];
      this.done = false;
    }

    /**
     * Creates a new Bezier Animation from the current parameters.
     * @return {BezierAnimation} A Bezier Animation that is a clone of this one.
     */
    clone() {
        return new BezierAnimation(this.scene, this.CPoints, this.speed);
    }
}
