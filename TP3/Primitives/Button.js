/**
 * Button
 * @constructor
 */
 function Button(scene) {
 	CGFobject.call(this, scene);

  this.cube = new UnitCube(this.scene);
  this.sphere = new Sphere(this.scene, 0.5, 10, 10);

  this.plasticMaterial = new CGFappearance(this.scene);
	this.plasticMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setShininess(1);
	this.plasticMaterial.loadTexture ("scenes/images/white_plastic.jpg");

	this.buttonMaterial = new CGFappearance(this.scene);
	this.buttonMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setShininess(1);
	this.buttonMaterial.loadTexture("scenes/images/red_velvet.jpg");
 };

 Button.prototype = Object.create(CGFobject.prototype);
 Button.prototype.constructor = Button;

 Button.prototype.display = function() {
 	//Cube
 	this.scene.pushMatrix();
   // 	this.scene.translate(0, 0, 0.5);
    this.plasticMaterial.apply();
   	this.cube.display();
 	this.scene.popMatrix();

  //Cube
  this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.buttonMaterial.apply();
    this.scene.registerForPick(100, this.cube);
    this.sphere.display();
  this.scene.popMatrix();
 };
