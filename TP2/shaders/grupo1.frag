#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform float r;
uniform float g;
uniform float b;

varying vec4 coords;
varying vec4 normal;

void main() {
	gl_FragColor = vec4(r*timeFactor, g*timeFactor, b*timeFactor, 1.0);
}
