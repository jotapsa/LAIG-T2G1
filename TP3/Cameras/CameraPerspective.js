/**
 * constructor of camera prespective
 * @constructor CameraPerspective
 * @param 	{String}	name  		camera name to be desplayed on interface
 * @param 	{vec3}		position	vector with x, y and z position of the camera
 * @param 	{vec3}		direction	vector with the direction of the camera
 *
 */

 function CameraPerspective(name, position, direction) {

 	this.name = name;
 	this.position = position || vec3.fromValues(10, 10, 10);
 	this.direction = direction || vec3.fromValues(0, 0, 0);

 	this.cameraMatrix = mat4.create();
 	mat4.identity(this.cameraMatrix);
 }

 CameraPerspective.prototype.getName = function(){
   return this.name;
 }

CameraPerspective.prototype.getPosition = function(){
  return this.position;
}

CameraPerspective.prototype.getDirection = function(){
  return this.direction;
}
