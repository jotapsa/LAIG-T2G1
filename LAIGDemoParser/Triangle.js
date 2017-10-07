var X = 0;
var Y = 1;
var Z = 2;

/**
 * Triangle
 * @constructor
 */
 function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
 	CGFobject.call(this,scene);

 	this.vertex = [
 	x1, y1, z1,
 	x2, y2, z2,
 	x3, y3, z3,
 	];

 	this.v4 = [];
 	this.v4.push (x2-x1, y2-y1, z2-z1);

 	this.v5 = [];
 	this.v5.push (x3-x1, y3-y1, z3-z1);

 	this.minS = 0;
 	this.maxS = 1;
 	this.minT = 0;
 	this.maxT = 1;
 	
 	this.initBuffers();
 	
 };

 Triangle.prototype = Object.create(CGFobject.prototype);
 Triangle.prototype.constructor = Triangle;

 Triangle.prototype.initBuffers = function() {
 	this.vertices = this.vertex;

 	this.texCoords = [
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.maxS/2, this.minT,
 	];

 	this.indices = [
 	0, 1, 2,
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
 	  this.v4[Y]*this.v5[Z]-this.v4[Z]*this.v5[Y], this.v4[Z]*this.v5[X]-this.v4[X]*this.v5[Z], this.v4[X]*this.v5[Y]-this.v4[Y]*this.v5[X],
 	  this.v4[Y]*this.v5[Z]-this.v4[Z]*this.v5[Y], this.v4[Z]*this.v5[X]-this.v4[X]*this.v5[Z], this.v4[X]*this.v5[Y]-this.v4[Y]*this.v5[X],
 	  this.v4[Y]*this.v5[Z]-this.v4[Z]*this.v5[Y], this.v4[Z]*this.v5[X]-this.v4[X]*this.v5[Z], this.v4[X]*this.v5[Y]-this.v4[Y]*this.v5[X],
    ]

 	this.initGLBuffers();
 };