/**
 * ComboAnimation
 * @constructor
 */
class ComboAnimation extends Animation {
    constructor(scene,animations) {
      super(scene);
      this.animations = animations;
      this.currAnimation = 0;
    }

    update(currTime){

      if (this.isDone()){
        return;
      }

      let updated = 0;
      for(let i = 0;i < this.animations.length && updated != 1; i++){
        if (!this.animations[i].isDone()){
          this.animations[i].update(currTime);
          this.currAnimation = i;
          updated = 1;
        }
      }

      if(!updated){
        this.done = true;
      }

    }

    getTransformMatrix(){
      mat4.identity(this.transformMatrix);

      for(let i = 0; i <= this.currAnimation; i++){
          mat4.multiply(this.transformMatrix,this.transformMatrix, this.animations[i].getTransformMatrix());
      }

      // for(let i = this.currAnimation; i >= 0; i--){
      //     mat4.multiply(this.transformMatrix,this.transformMatrix, this.animations[i].getTransformMatrix());
      // }

      return this.transformMatrix;
    }

    /**
     * Creates a new Circular Animation from the current parameters.
     * @return {ComboAnimation} A Circular Animation that is a clone of this one.
     */
    clone() {
        return new ComboAnimation(this.scene, this.animations);
    }
}
