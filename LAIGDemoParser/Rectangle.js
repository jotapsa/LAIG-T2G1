var X = 0;
var Y = 1;
var Z = 2;

/**
 * Rectangle
 * @constructor
 */
 function Rectangle(scene, x1, y1, x2, y2) {
 	CGFobject.call(this,scene);
  
    this.topLeftVertex = [];
    this.topLeftVertex.push(x1, y1, 0);

    this.botRightVertex = [];
    this.botRightVertex.push(x2, y2, 0);

 	this.minS = 0;
 	this.maxS = 1;
 	this.minT = 0;
 	this.maxT = 1;
 	
 	this.initBuffers();
 	
 };

 Rectangle.prototype = Object.create(CGFobject.prototype);
 Rectangle.prototype.constructor = Rectangle;

 Rectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.topLeftVertex[X], this.topLeftVertex[Y], 0,
 	this.topLeftVertex[X], this.botRightVertex[Y], 0,
 	this.botRightVertex[X], this.botRightVertex[Y], 0,
 	this.botRightVertex[X], this.topLeftVertex[Y], 0,
 	];

 	this.texCoords = [
    this.minS, this.maxT,
    this.minS, this.minT,
    this.maxS, this.minT,
    this.maxS, this.maxT,
 	];
 	
    this.originalTexCoords = this.texCoords.slice();

 	this.indices = [
 	0, 1, 2, 
 	0, 2, 3
 	]; 	

 	this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]

    this.originalTexCoords = this.texCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 Rectangle.prototype.scaleTexCoords = function(sFactor, tFactor) {
    for (i = 0; i<this.texCoords.length; i+=2) {
        this.texCoords[i] = this.originalTexCoords[i] / sFactor;
        this.texCoords[i+1] = this.originalTexCoords[i+1] / tFactor;
    }

    this.updateTexCoordsGLBuffers();
};