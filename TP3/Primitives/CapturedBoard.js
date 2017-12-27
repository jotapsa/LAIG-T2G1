/**
* CapturedBoard
* @param type {Type of pieces that are displayed}
* @constructor
*/
function CapturedBoard(scene, pieceType){
	CGFobject.call(this,scene);

	this.boardWidth = this.scene.game.board.getsizeN();
  this.boardLength = 2;
  this.boardHeigth = 1;

  if(pieceType == 0){
    this.pieceType = "black";
  }
  else{
    this.pieceType = "white";
  }

	this.cube= new UnitCube(this.scene);
	this.piece = new Piece(this.scene, this.pieceType);

  switch(this.pieceType){
    case "white":{
      this.boardMaterial = new CGFappearance(this.scene);
      this.boardMaterial.setAmbient(0.5, 0.5, 0.5, 1);
      this.boardMaterial.setSpecular(0.5, 0.5, 0.5, 1);
      this.boardMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
      this.boardMaterial.setShininess(1);
      this.boardMaterial.loadTexture ("scenes/images/black_marble.jpg");
    }
    break;
    case "black":{
      this.boardMaterial = new CGFappearance(this.scene);
      this.boardMaterial.setAmbient(0.5, 0.5, 0.5,1);
      this.boardMaterial.setSpecular(0.5, 0.5, 0.5,1);
      this.boardMaterial.setDiffuse(0.5, 0.5, 0.5,1);
      this.boardMaterial.setShininess(1);
      this.boardMaterial.loadTexture("scenes/images/white_marble.jpg");
    }
    break;
    default:
    break;
  }
};

CapturedBoard.prototype = Object.create(CGFobject.prototype);
CapturedBoard.prototype.constructor=CapturedBoard;

CapturedBoard.prototype.display = function (){
	this.scene.pushMatrix();
		this.scene.scale(this.boardWidth, this.boardHeigth, this.boardLength);
		this.boardMaterial.apply();
		this.cube.display();
	this.scene.popMatrix();

	let xPiece, yPiece;

	xPiece = -(this.boardWidth/2) + 0.5;
	yPiece = -(this.boardLength/2) + 0.5;

	switch(this.pieceType){
		case "white":{
			for(let i=0; i<this.scene.game.board.capturedWhites.length; i++){
				this.scene.pushMatrix();
					this.scene.translate(xPiece, this.boardHeigth/2, yPiece);
					this.piece.display();
					if(this.scene.game.board.capturedWhites[i] == CELL.WHITE_KING){
						this.scene.translate(0,0.21,0);
						this.piece.display();
					}
				this.scene.popMatrix();

				xPiece++;
				if(xPiece > (this.boardWidth/2)){
					yPiece++;
					xPiece = -(this.boardWidth/2) + 0.5;
				}
			}
		}
		break;
		case "black":{
			for(let i=0; i<this.scene.game.board.capturedBlacks.length; i++){
				this.scene.pushMatrix();
					this.scene.translate(xPiece, this.boardHeigth/2, yPiece);
					this.piece.display();
					if(this.scene.game.board.capturedBlacks[i] == CELL.BLACK_KING){
						this.scene.translate(0,0.21,0);
						this.piece.display();
					}
				this.scene.popMatrix();

				xPiece++;
				if(xPiece > (this.boardWidth/2)){
					yPiece++;
					xPiece = -(this.boardWidth/2) + 0.5;
				}
			}
		}
		break;
		default:
		break;
	}

};
