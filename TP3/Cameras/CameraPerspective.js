/**
 * @constructor CameraPerspective
 * @param 	{vec3}		position	vector with x, y and z position of the camera
 * @param 	{vec3}		target
 *
 */

 function CameraPerspective(position, target) {

 	this.position = position || vec3.fromValues(10, 10, 10);
 	this.target = target || vec3.fromValues(0, 0, 0);

 	this.cameraMatrix = mat4.create();
 	mat4.identity(this.cameraMatrix);
 }
