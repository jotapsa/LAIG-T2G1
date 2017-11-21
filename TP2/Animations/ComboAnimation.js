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

      if (!this.animations[this.currAnimationIndex].isDone()){
        this.animations[this.currAnimationIndex].update(deltaTime);
      }
      else if (this.animations.length > (this.currAnimationIndex+1)){
        this.currAnimationIndex++;
        this.animations[this.currAnimationIndex].update(deltaTime);
      }
      else{
        this.done = true;
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
      this.currAnimationIndex = 0;
      this.done = false;
    }


    /**
     * Creates a new Circular Animation from the current parameters.
     * @return {ComboAnimation} A Circular Animation that is a clone of this one.
     */
    clone() {
        return new ComboAnimation(this.scene, this.animations);
    }
}
