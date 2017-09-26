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

 	this.minS = minS || 0;
 	this.maxS = maxS || 1;
 	this.minT = minT || 0;
 	this.maxT = maxT || 1;
 	
 	this.initBuffers();
 	
 };

 Rectangle.prototype = Object.create(CGFobject.prototype);
 Rectangle.prototype.constructor = Rectangle;

 Rectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.topLeftVertex[X], this.topLeftVertex[Y], this.topLeftVertex[Z],
 	this.topLeftVertex[X], this.botRightVertex[Y], this.topLeftVertex[Z],
 	this.botRightVertex[X], this.botRightVertex[Y], this.botRightVertex[Z],
 	this.botRightVertex[X], this.topLeftVertex[Y], this.botRightVertex[Z],
 	];

 	this.texCoords = [
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.minS, this.minT,
    this.maxS, this.minT,
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]

 	this.initGLBuffers();
 };