/**
 * Sphere
 * @constructor
 */
 function Sphere(scene, radius ,slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;
	console.log ("Slices", this.slices);
	console.log ("Stacks", this.stacks);
	
	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {
 	/*
 	*/

	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

	var theta=(2*Math.PI)/this.slices;
	var vertical_theta=(Math.PI)/this.stacks;
	var r;

	var s = this.minS;
	var t = this.minT;
	var sInc = (this.maxS-this.minS)/this.slices;
	var tInc = (this.maxT-this.minT)/this.stacks;

	for (stack=0; stack<=this.stacks; stack++)
	{
		for (slice=0; slice<=this.slices; slice++)
		{
			z = Math.cos(vertical_theta*stack)
			r = Math.sqrt(1 - Math.pow(z,2));

			x = r * Math.sin (theta*slice);
			y = r * Math.cos (theta*slice);

			this.vertices.push (this.radius*x, this.radius*y , this.radius*z);
			this.normals.push (x, y , z);
			this.texCoords.push (s+ slice*sInc, t+ stack*tInc);
		}
		s = this.minS;
	}

	for (j=0; j<this.stacks; j++)
	{
		for (i=0; i<this.slices; i++){
			this.indices.push(((this.slices+1)*j)+i,((this.slices+1)*j)+i+1,((this.slices+1)*(j+1))+i);
			this.indices.push(((this.slices+1)*(j+1))+i+1,((this.slices+1)*(j+1))+i,((this.slices+1)*j)+i+1);
		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };
