#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;

attribute vec3 aVertexPosition;	//Vertex Position
attribute vec3 aVertexNormal;	//Vertex Normal
attribute vec2 aTextureCoord;	//Texture Coordinates

uniform mat4 uMVMatrix;	//Model-View Matrix
uniform mat4 uPMatrix;	//Projection Matrix
uniform mat4 uNMatrix;	//Normal Transformation Matrix

varying vec2 vTextureCoord;


void main() {
	vec4 vertex=vec4(aVertexPosition+aVertexNormal*timeFactor*0.1, 1.0);
	gl_Position = uPMatrix * uMVMatrix * vertex;

	vTextureCoord = aTextureCoord;
}
