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
      console.log(this.CPoints.length);

      this.casteljau = deCasteljau (this.CPoints);
      this.curveLength = distance (this.casteljau[l1], this.casteljau[l2]) + distance (this.casteljau[l2], this.casteljau[l3]) + distance (this.casteljau[l3], this.casteljau[l4]) +
        distance (this.casteljau[r1], this.casteljau[r2]) + distance (this.casteljau[r2], this.casteljau[r3]) + distance (this.casteljau[r3], this.casteljau[r4]);
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
