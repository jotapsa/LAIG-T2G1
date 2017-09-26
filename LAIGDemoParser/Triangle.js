/**
 * Triangle
 * @constructor
 */
 function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
 	CGFobject.call(this,scene);

 	this.vertex = [];
 	this.vertex.push(x1, y1, z1, x2, y2, z2, x3, y3, z3);

 	this.minS = minS || 0;
 	this.maxS = maxS || 1;
 	this.minT = minT || 0;
 	this.maxT = maxT || 1;
 	
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
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]

 	this.initGLBuffers();
 };