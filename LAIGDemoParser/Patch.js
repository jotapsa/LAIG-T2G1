/**
 * Patch
 * @constructor
 */
 function Patch(scene, partsU, partsV) {
 	CGFobject.call(this,scene);
  
    this.partsU = partsU;
    this.partsV = partsV;

 	this.minS = 0;
 	this.maxS = 1;
 	this.minT = 0;
 	this.maxT = 1;
 	
 	this.initBuffers();
 	
 };

 Patch.prototype = Object.create(CGFobject.prototype);
 Patch.prototype.constructor = Patch;

 Patch.prototype.initBuffers = function() {

 	this.initGLBuffers();
 };
