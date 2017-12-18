/**
 * Board
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Board(scene) {
	CGFobject.call(this,scene);
	this.cube= new UnitCube(this.scene)

	this.materialChair = new CGFappearance(this.scene);
	this.materialChair.setAmbient(0.6, 0.32, 0.004,1);
	this.materialChair.setSpecular(0.1,0.1,0.1,1);
	this.materialChair.setDiffuse(0.1,0.1,0.1,1);
	this.materialChair.setShininess(1);
	//this.materialChair.loadTexture ("resources/images/wood_chair.jpg");

};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;

Board.prototype.display = function () {
	// LEGS
	this.scene.pushMatrix();
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();


};
