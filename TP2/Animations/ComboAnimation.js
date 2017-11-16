/**
 * ComboAnimation
 * @constructor
 */
class ComboAnimation extends Animation {
    constructor(scene,animations) {
      super(scene);
      this.animations = animations;
      this.currAnimationIndex = 0;
    }

    update(deltaTime){

      if (this.isDone()){
        return;
      }

      if (this.animations.length!=0){
        if (!this.animations[this.currAnimationIndex].isDone()){
          this.animations[this.currAnimationIndex].update(deltaTime);
        }
        else if (this.animations.length > this.currAnimationIndex+1){
          this.currAnimationIndex++;
          this.animations[this.currAnimationIndex].update(deltaTime);
        }
        else{
          //don't update... everything done
        }
      }
    }

    getTransformMatrix(){
      return this.animations[this.currAnimationIndex].getTransformMatrix();
    }

    /**
     * Resets the animation.
     */
    resetAnimation(){
      for(let i=0; i<this.animations.length; i++){
        this.animations[i].resetAnimation();
      }
    }


    /**
     * Creates a new Circular Animation from the current parameters.
     * @return {ComboAnimation} A Circular Animation that is a clone of this one.
     */
    clone() {
        return new ComboAnimation(this.scene, this.animations);
    }
}
