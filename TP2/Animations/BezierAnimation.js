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

      this.v1 = addPoints(addPoints(multVector(this.CPoints[1], 9),multVector (this.CPoints[0], -3)), addPoints(multVector(this.CPoints[3], 3), multVector(this.CPoints[2], -9)));
      this.v2 = addPoints(addPoints(multVector(this.CPoints[0], 6), multVector(this.CPoints[1], -12)), multVector(this.CPoints[2], 6));
      this.v3 = addPoints(multVector(this.CPoints[0], -3), multVector(this.CPoints[1], 3));
      //console.log(this.v1);
      //console.log(this.v2);
      //console.log(this.v3);

      this.t0 = 0;
      this.t1 = 0;
      this.resetAnimation();
    }

    update(deltaTime){
      //If the animation is already complete, just return.
      if (this.isDone()){
        return;
      }

      this.dist = this.speed*(deltaTime/1000);

      //since in Bezier curves 0 >= t >= 1
      this.t0 = this.t1;
      this.velocity = addPoints(addPoints(multVector(this.v1, Math.pow(this.t0, 2)), multVector(this.v2,this.t0)), this.v3);
      this.velMOD = distance(this.velocity, [0,0,0])
      this.t1 = this.t0 + (this.dist/this.velMOD);
      //console.log(this.t1);
      //console.log(this.velMOD + "velocity mod");


      // for(let i=0 ; i<10; i++){
      //   this.velocity = addPoints(addPoints(multVector(this.v1, Math.pow(this.t1, 2)), multVector(this.v2,this.t1)), this.v3);
      //   this.velMOD = distance(this.velocity, [0,0,0])
      //   this.t1 = this.t1 + ((this.dist/10)/this.velMOD);
      //   console.log(this.t1);
      //   console.log(this.velMOD + "velocity mod");
      // }


      for (let i=0; i<3; i++){
        this.position[i] = Math.pow((1-this.t1),3)*this.CPoints[0][i]+
          3*this.t1*Math.pow((1-this.t1),2)*this.CPoints[1][i]+
          3*Math.pow(this.t1,2)*(1-this.t1)*this.CPoints[2][i]+
          Math.pow(this.t1,3)*this.CPoints[3][i];
      }
      //console.log (this.position);
      this.angleZX = Math.atan2(this.velocity[X], this.velocity[Z]);

      this.elapsedTime += deltaTime/1000;

      if (this.t1 >= 1) {
          this.done=true;
      }

    }

    /**
     * Returns the transformationMatrix according to the current state of the animation.
     */
    getTransformMatrix(){
      mat4.identity(this.transformMatrix);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.position[X], this.position[Y], this.position[Z]]);
      mat4.rotate(this.transformMatrix, this.transformMatrix,this.angleZX, this.axisCoords['y']);

      return this.transformMatrix;
    }


    /**
     * Resets the animation.
     */
    resetAnimation(){
      this.angleZX = 0;
      this.elapsedTime = 0;
      this.position = this.CPoints[0];
      this.done = false;
      this.t1 = 0;
    }

    /**
     * Creates a new Bezier Animation from the current parameters.
     * @return {BezierAnimation} A Bezier Animation that is a clone of this one.
     */
    clone() {
        return new BezierAnimation(this.scene, this.CPoints, this.speed);
    }
}
