/**
 * Board
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Board(scene, sizeN, pieces){
  //sizeN tem q ser par
  //As pecas estao sempre nos blocos pretos
  //O lado das brancas começa por um bloco pretos

	CGFobject.call(this,scene);

  this.sizeN = sizeN || 8;
	this.totalBlackSquares = Math.pow(this.sizeN, 2)/2;
	this.blackSquareFlag = true;
	this.pieces = pieces;
	this.whitePieces = pieces || 12;
	this.blackPieces = pieces || 12;

	this.cube= new UnitCube(this.scene);
	this.blackPiece = new Piece(this.scene, "black");
	this.whitePiece = new Piece(this.scene, "white");

	this.whiteMaterial = new CGFappearance(this.scene);
	this.whiteMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setShininess(1);
	this.whiteMaterial.loadTexture ("scenes/images/white_marble.jpg");

	this.whitePieceMaterial = new CGFappearance(this.scene);
	this.whitePieceMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setShininess(1);
	this.whitePieceMaterial.loadTexture ("scenes/images/white_checker.jpg");

  this.blackMaterial = new CGFappearance(this.scene);
  this.blackMaterial.setAmbient(0.5, 0.5, 0.5,1);
  this.blackMaterial.setSpecular(0.5, 0.5, 0.5,1);
  this.blackMaterial.setDiffuse(0.5, 0.5, 0.5,1);
  this.blackMaterial.setShininess(1);
  this.blackMaterial.loadTexture("scenes/images/black_marble.jpg");

	this.blackPieceMaterial = new CGFappearance(this.scene);
	this.blackPieceMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setShininess(1);
	this.blackPieceMaterial.loadTexture("scenes/images/black_checker.jpg");

};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;

Board.prototype.display = function () {

  for(let y=(-this.sizeN/2); y<(this.sizeN/2); y++){
    for(let x=(-this.sizeN/2); x<(this.sizeN/2); x++){
      this.scene.pushMatrix();
        this.scene.translate(x+0.5, y+0.5, 0); //+0.5 because the cubes are centered

        if(this.blackSquareFlag){
					if(this.whitePieces>0){
						this.scene.pushMatrix();
							this.scene.translate(0, 0, 0.5);
							this.whitePiece.display();
						this.scene.popMatrix();
						this.whitePieces--;
					}
					else if(this.blackPieces>0 && this.totalBlackSquares == this.blackPieces){
						this.scene.pushMatrix();
							this.scene.translate(0, 0, 0.5);
							this.blackPiece.display();
						this.scene.popMatrix();
						this.blackPieces--;
					}
					this.totalBlackSquares--;

          this.blackMaterial.apply();
        }
        else{
          this.whiteMaterial.apply();
        }
				this.blackSquareFlag = !this.blackSquareFlag;

        this.cube.display();
      this.scene.popMatrix();
    }
		this.blackSquareFlag = !this.blackSquareFlag;
  }

	this.whitePieces= this.pieces;
	this.blackPieces = this.pieces;
	this.totalBlackSquares = Math.pow(this.sizeN, 2)/2;


};
