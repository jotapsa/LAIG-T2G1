#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform float r;
uniform float g;
uniform float b;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main() {
	vec4 texture = texture2D(uSampler, vTextureCoord);
	vec4 color = vec4(r*timeFactor, g*timeFactor, b*timeFactor, 1.0);
	color = color + texture;
	
	gl_FragColor = color;
}
