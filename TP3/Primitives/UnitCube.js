/**
 * UnitCube
 * @constructor
 */
 function UnitCube(scene) {
 	CGFobject.call(this, scene);

 	this.unitRect = new Rectangle(this.scene, -0.5, 0.5, 0.5, -0.5);
 };

 UnitCube.prototype = Object.create(CGFobject.prototype);
 UnitCube.prototype.constructor = UnitCube;

 UnitCube.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
   	this.scene.rotate(180 * degToRad, 1, 0, 0);
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
   	this.scene.rotate(-90 * degToRad, 1, 0, 0);
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
   	this.scene.rotate(90 * degToRad, 1, 0, 0);
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
   	this.scene.rotate(-90 * degToRad, 0, 1, 0);
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
   	this.scene.rotate(90 * degToRad, 0, 1, 0);
   	this.scene.translate(0, 0, 0.5);
   	this.unitRect.display();
 	this.scene.popMatrix();
 };
