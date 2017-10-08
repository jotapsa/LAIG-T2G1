/**
 * Sphere
 * @constructor
 */
 function Sphere(scene, radius ,stacks, slices) {
 	CGFobject.call(this,scene);
	
	this.radius = radius;
	this.stacks = stacks;
	this.slices = slices;
	
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
		for (slice=0; slice<this.slices; slice++)
		{
			z = -Math.cos(vertical_theta* stack)
			r = Math.sqrt(1 - Math.pow(z,2));

			x = r * Math.sin (theta*slice);
			y = r * Math.cos (theta*slice);

			this.vertices.push (this.radius*x, this.radius*y , this.radius*z);
			this.normals.push (this.radius*x, this.radius*y , this.radius*z);
			this.texCoords.push (s+ slice*sInc, t+ stack*tInc);
		}
		s = this.minS;
	}

	for (j=0; j<this.stacks; j++)
	{
		for (i=0; i<this.slices; i++)
		{
			if (!(i==this.slices-1))
			{
				this.indices.push(i+(j*this.slices),i+1+(j*this.slices),i+1+this.slices+(j*this.slices));
				this.indices.push(i+1+this.slices+(j*this.slices), i+this.slices+(j*this.slices), i+(j*this.slices));
			}
			else
			{
				this.indices.push(this.slices*(j), this.slices*(j+1), this.slices*(j+1)-1);
				this.indices.push(this.slices*(j+1)-1, this.slices*(j+1), this.slices*(j+2)-1);

			}
		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };
