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

 	this.a=Math.sqrt(Math.pow(x1-x3,2)+Math.pow(y1-y3,2)+Math.pow(z1-z3,2));
    this.b=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(z2-z1,2));
    this.c=Math.sqrt(Math.pow(x3-x2,2)+Math.pow(y3-y2,2)+Math.pow(z3-z2,2));

    this.cosBeta = (Math.pow(this.a,2)-Math.pow(this.b,2)+Math.pow(this.c,2))/(2*this.a*this.c);
    this.beta = Math.acos(this.cosBeta);
    this.sinBeta = Math.sin(this.beta);

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
    this.minS+this.c, this.maxT,
    this.minS+this.c-this.a*this.cosBeta, this.minT-this.a*this.sinBeta,
 	];
    this.originalTexCoords = this.texCoords.slice();

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


Triangle.prototype.scaleTexCoords = function(sFactor, tFactor) {
    for (i = 0; i<this.texCoords.length; i+=2) {
        this.texCoords[i] = this.originalTexCoords[i] / sFactor;
        this.texCoords[i+1] = this.originalTexCoords[i+1] / tFactor;
    }

    this.updateTexCoordsGLBuffers();
};