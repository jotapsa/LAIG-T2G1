/**
 * Button
 * @constructor
 */
 function Button(scene,player) {
 	CGFobject.call(this, scene);

  this.player = player;

  this.cube = new UnitCube(this.scene);
  this.sphere = new Sphere(this.scene, 0.5, 10, 10);

  this.plasticMaterial = new CGFappearance(this.scene);
	this.plasticMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.plasticMaterial.setShininess(1);
	this.plasticMaterial.loadTexture ("scenes/images/carbonfiber.jpg");

  this.buttonDrawMaterial = new CGFappearance(this.scene);
	this.buttonDrawMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.buttonDrawMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.buttonDrawMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.buttonDrawMaterial.setShininess(1);
  this.buttonDrawMaterial.loadTexture("scenes/images/green_draw.jpg");

	this.buttonMaterial = new CGFappearance(this.scene);
	this.buttonMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.buttonMaterial.setShininess(1);

  switch(this.player){
    case 'whites':
      this.id = 99;
      this.buttonMaterial.loadTexture ("scenes/images/white_plastic.jpg");
      break;
    case 'blacks':
      this.id = 100;
      this.buttonMaterial.loadTexture("scenes/images/red_velvet.jpg");
      break;
    default:
      this.id = 101;
      break;
  }
 };

 Button.prototype = Object.create(CGFobject.prototype);
 Button.prototype.constructor = Button;

 Button.prototype.display = function() {
 	//Cube
 	this.scene.pushMatrix();
    this.plasticMaterial.apply();
   	this.cube.display();
 	this.scene.popMatrix();

  //Cube
  this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);

    if(this.player == 'whites' && this.scene.game.whites.wantsDraw()){
      this.buttonDrawMaterial.apply();
    }
    else if(this.player == 'blacks' && this.scene.game.blacks.wantsDraw()){
      this.buttonDrawMaterial.apply();
    }
    else {
      this.buttonMaterial.apply();
    }

    this.scene.registerForPick(this.id, this.sphere);
    this.sphere.display();
  this.scene.popMatrix();
 };
