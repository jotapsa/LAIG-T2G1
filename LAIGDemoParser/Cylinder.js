/**
 * Cylinder
 * @constructor
 */
 function Cylinder(scene, height, botRadius, topRadius, stacks, slices, topCat, botCat) {
 	CGFobject.call(this,scene);

	this.height= height;
	
	this.stacks = stacks;
	this.slices = slices;
	this.botRadius = botRadius;
	this.topRadius = topRadius;
	this.topCat = topCat;
	this.botCat = botCat;

	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;

 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {
 	/*
 	*/

	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

	var theta=(2*Math.PI)/this.slices;
	var stacksStep = this.height/this.stacks;
	var radiusStep= (this.topRadius-this.botRadius)/this.stacks;

	var s = this.minS;
	var t = this.minT;
	var sInc = (this.maxS-this.minS)/this.slices;
	var tInc = (this.maxT-this.minT)/this.stacks;

	for (i=0; i<=this.stacks; i++)
	{
		for (j=0;j<=this.slices;j++) // <= because we have to repeat the first vertice in order to get a seamless texture wrap
		{
			this.vertices.push((this.botRadius+radiusStep*i)*Math.cos(theta*j), (this.botRadius+radiusStep*i)*Math.sin (theta*j), (i*stacksStep));
			this.normals.push((Math.cos(theta*(j))), (Math.sin(theta*(j))), 0); //need to change this for a truncated cylinder
			this.texCoords.push (s+ j*sInc, t+ i*tInc);
		}
		s = this.minS;
	}
	t=this.minT;

	for (j=0; j<this.stacks; j++)
	{
		for (i=0; i<this.slices; i++) //since we now do one more iteration in the for loop for slices we also have to add 1 everytime we refer to this.slices
		{
				this.indices.push(i+(j*(this.slices+1)),i+1+(j*(this.slices+1)),i+1+(this.slices+1)+(j*(this.slices+1)));
				this.indices.push(i+1+(this.slices+1)+(j*(this.slices+1)), i+(this.slices+1)+(j*(this.slices+1)), i+(j*(this.slices+1)));
		}
	}

	if (this.botCat){

		this.vertices.push(0, 0, 0);
		this.normals.push(0, 0, -1); 
		//this.texCoords.push (0.5, 0.5);

		for (i=0; i<=this.slices; i++){
			this.vertices.push(this.botRadius*Math.cos(theta*i), this.botRadius*Math.sin(theta*i), 0);
			this.normals.push(0,0,-1);
			//texCoords ?

		}
		for (i=0; i<this.slices; i++){
			this.indices.push((this.stacks*this.slices-1)+1, (this.stacks*this.slices-1)+i+1, (this.stacks*this.slices-1)+i+2);
		}
	}

	if (this.topCat){
		
		this.vertices.push(0, 0, this.height);
		this.normals.push(0, 0, 1); 
		//this.texCoords.push (0.5, 0.5);
		
		for (i=0; i<=this.slices; i++){
			this.vertices.push(this.topRadius*Math.cos(theta*i), this.topRadius*Math.sin(theta*i), this.height);
			this.normals.push(0,0,1);
			//texCoords ?
		}
		
		for (i=0; i<this.slices; i++){
			if (this.botCat){
				this.indices.push((this.stacks*this.slices+this.slices-1)+1, (this.stacks*this.slices+this.slices-1)+i+1, (this.stacks*this.slices+this.slices-1)+i+2);
				console.log("entrou");
			}
			else{
				this.indices.push((this.stacks*this.slices-1)+1, (this.stacks*this.slices-1)+i+1, (this.stacks*this.slices-1)+i+2);
			}
		}

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };
