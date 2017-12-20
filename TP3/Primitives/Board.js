var invalidSquare = -1;
var emptySquare = 0;
var whitePiece = 1;
var blackPiece = 2;

/**
 * Board
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Board(scene){
	CGFobject.call(this,scene);

	this.game = new DraughtMap ();
	this.sizeN = this.game.getsizeN();

	this.cube= new UnitCube(this.scene);
	this.blackPiece = new Piece(this.scene, "black");
	this.whitePiece = new Piece(this.scene, "white");

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

	for(let y=0; y<this.sizeN; y++){
		for(let x=0; x<this.sizeN; x++){
			this.scene.pushMatrix();
				this.scene.translate(x-(this.sizeN/2)+0.5, y-(this.sizeN/2)+0.5, 0); //+0.5 because the cubes are centered
				switch (this.game.getPos(y, x)){
					case invalidSquare:{
						this.whiteMaterial.apply();
						this.scene.registerForPick(y*this.sizeN+x, this.cube);
						this.cube.display();
					}
					break;
					case emptySquare:{
						this.blackMaterial.apply();
						this.scene.registerForPick(y*this.sizeN+x, this.cube);
						this.cube.display();
					}
					break;
					case whitePiece:{
						this.blackMaterial.apply();
						this.scene.registerForPick(y*this.sizeN+x, this.cube);
						this.cube.display();
						this.scene.translate(0,0,0.5);
						this.whitePiece.display();
					}

					break;
					case blackPiece:
					{
						this.blackMaterial.apply();
						this.scene.registerForPick(y*this.sizeN+x, this.cube);
						this.cube.display();
						this.scene.translate(0,0,0.5);
						this.blackPiece.display();
					}
					break;
					default:
					break;
				}
			this.scene.popMatrix();
			}
		}
	};
