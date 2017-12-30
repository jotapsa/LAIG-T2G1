/**
* Absorver
* @param gl {WebGLRenderingContext}
* @constructor
*/
function Absorver(scene){
	CGFobject.call(this,scene);
	this.cube= new UnitCube(this.scene);
};

Absorver.prototype = Object.create(CGFobject.prototype);
Absorver.prototype.constructor=Absorver;

Absorver.prototype.display = function (){
	this.scene.pushMatrix();
		this.cube.display();
	this.scene.popMatrix();
};
