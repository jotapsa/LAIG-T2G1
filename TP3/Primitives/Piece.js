/**
 * Piece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Piece(scene, colour){
	CGFobject.call(this,scene);

	this.cylinder = new Cylinder(this.scene, 0.2, 0.4, 0.4, 20, 20, 1, 1);
  this.colour = colour;

	switch(this.colour){
		case "white":{
			this.pieceMaterial = new CGFappearance(this.scene);
			this.pieceMaterial.setAmbient(0.5, 0.5, 0.5, 1);
			this.pieceMaterial.setSpecular(0.5, 0.5, 0.5, 1);
			this.pieceMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
			this.pieceMaterial.setShininess(1);
			this.pieceMaterial.loadTexture ("scenes/images/white_checker.jpg");
		}
		break;
		case "black":{
			this.pieceMaterial = new CGFappearance(this.scene);
			this.pieceMaterial.setAmbient(0.5, 0.5, 0.5,1);
			this.pieceMaterial.setSpecular(0.5, 0.5, 0.5,1);
			this.pieceMaterial.setDiffuse(0.5, 0.5, 0.5,1);
			this.pieceMaterial.setShininess(1);
			this.pieceMaterial.loadTexture("scenes/images/black_checker.jpg");
		}
		break;
		case "selected":{
			this.pieceMaterial = new CGFappearance(this.scene);
			this.pieceMaterial.setAmbient(1, 1, 1,1);
			this.pieceMaterial.setSpecular(1, 1, 1,1);
			this.pieceMaterial.setDiffuse(1, 1, 1,1);
			this.pieceMaterial.setShininess(1);
			this.pieceMaterial.loadTexture("scenes/images/sat_blue.png");
		}
		break;
		default:
		break;
	}
}

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;

Piece.prototype.display = function () {
  this.scene.pushMatrix();
    this.pieceMaterial.apply();
    this.cylinder.display();
  this.scene.popMatrix();
};
