/**
 * ComboAnimation
 * @constructor
 */
class ComboAnimation extends Animation {
    constructor(scene,animations) {
      super(scene);
      this.animations = animations;
    }

    update(currTime){

      if (this.isDone()){
        return ;
      }

      let updated = 0;
      for(let i = 0;i < this.animations.length && updated != 1; i++){
        if (!this.animations[i].isDone()){
          this.animations[i].update(currTime);
          updated = 1;
        }
      }

      if(!updated)
        this.done = true;
    }

    getTransformMatrix(){
      for(let i = 0; i < this.animations.length; i++){
        if (!this.animations[i].isDone()){
          return this.animations[i].getTransformMatrix();
        }
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
