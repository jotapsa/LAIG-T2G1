#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
	//vec4 texture = texture2D(uSampler, vTextureCoord);
	vec4 color = vec4(0.0*timeFactor, 0.0*timeFactor, 1.0*timeFactor, 1.0);
	//color = color + texture;

	gl_FragColor = color;
}
