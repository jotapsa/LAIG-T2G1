/**
* Absorver
* @param gl {WebGLRenderingContext}
* @constructor
*/
function Absorver(scene){
	CGFobject.call(this,scene);
	this.cube= new UnitCube(this.scene);
	this.id = 200;
};

Absorver.prototype = Object.create(CGFobject.prototype);
Absorver.prototype.constructor=Absorver;

Absorver.prototype.display = function (){
	this.scene.pushMatrix();
		this.scene.registerForPick(this.id, this.cube);
		this.cube.display();
	this.scene.popMatrix();
};
