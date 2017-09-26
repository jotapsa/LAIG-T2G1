/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks, radius) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.radius = radius || 0.5, //r=0.5; d=1
	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

	var theta=(2*Math.PI)/this.slices;
	var stacksStep = 1.0/this.stacks;
	var s = this.minS;
	var t = this.minT;
	var sInc = (this.maxS-this.minS)/this.slices;
	var tInc = (this.maxT-this.minT)/this.stacks;

	for (i=0; i<=this.stacks; i++)
	{
		for (j=0;j<=this.slices;j++) // <= because we have to repeat the first vertice in order to get a seamless texture wrap
		{
			this.vertices.push(this.radius*Math.cos(theta*j), this.radius*Math.sin (theta*j), (i*stacksStep)-0.5);
			this.normals.push((Math.cos(theta*(j))), (Math.sin(theta*(j))), 0);
			this.texCoords.push (s+ j*sInc, t+ i*tInc);
		}
		s = this.minS;
	}

	for (j=0; j<this.stacks; j++)
	{
			for (i=0; i<this.slices; i++) //since we now do one more iteration in the for loop for slices we also have to add 1 everytime we refer to this.slices
		{
				this.indices.push(i+(j*(this.slices+1)),i+1+(j*(this.slices+1)),i+1+(this.slices+1)+(j*(this.slices+1)));
				this.indices.push(i+1+(this.slices+1)+(j*(this.slices+1)), i+(this.slices+1)+(j*(this.slices+1)), i+(j*(this.slices+1)));
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };
