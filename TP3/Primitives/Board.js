/**
 * Board
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Board(scene, sizeN, pieces){
  //sizeX e sizeY tem q ser param
  //As pecas estao sempre nos blocos pretos
  //O lado das brancas começa por um bloco pretos

	CGFobject.call(this,scene);

  this.sizeN = sizeN || 8;
  this.blackPieceFlag = true;

	this.cube= new UnitCube(this.scene)

	this.whiteMaterial = new CGFappearance(this.scene);
	this.whiteMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setShininess(1);
	this.whiteMaterial.loadTexture ("scenes/images/white_marble.jpg");

  this.blackMaterial = new CGFappearance(this.scene);
  this.blackMaterial.setAmbient(0.5, 0.5, 0.5,1);
  this.blackMaterial.setSpecular(0.5, 0.5, 0.5,1);
  this.blackMaterial.setDiffuse(0.5, 0.5, 0.5,1);
  this.blackMaterial.setShininess(1);
  this.blackMaterial.loadTexture("scenes/images/black_marble.jpg");

};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;

Board.prototype.display = function () {

  for(let y=(-this.sizeN/2); y<(this.sizeN/2); y++){
    for(let x=(-this.sizeN/2); x<(this.sizeN/2); x++){
      this.scene.pushMatrix();
        this.scene.translate(x+0.5, y+0.5, 0); //+0.5 because the cubes are centered

        if(this.blackPieceFlag){
          this.blackMaterial.apply();
        }
        else{
          this.whiteMaterial.apply();
        }
				this.blackPieceFlag = !this.blackPieceFlag;
				
        this.cube.display();
      this.scene.popMatrix();
    }
		this.blackPieceFlag = !this.blackPieceFlag;
  }


};
