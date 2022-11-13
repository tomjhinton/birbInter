import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'
import { useFrame } from '@react-three/fiber'
const fragmentShader = /* glsl */ `
uniform float frequency;
uniform float amplitude;
uniform float offset;
uniform vec2 mouseA;
void mainUv(inout vec2 uv){
    uv.y += sin(uv.x * (frequency * mouseA.x) + (offset + length(uv-.5))) * mouseA.y;
    uv.x += (sin((offset * .2) + length(uv)) * mouseA.x);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
    vec4 color = inputColor;

    vec2 uv2 = uv;
    uv2 = fract(uv * 10. * mouseA.y);
    color.rgb *= vec3(uv.x + uv2.x, uv.y, mouseA.x);
    
    outputColor = color;
    //outputColor = vec4(.8, 1., .3, inputColor.a);
    
}`


export default class Warpffect extends Effect{

   
   
    constructor({ mouse={x:0, y:0}, frequency, amplitude, blendFunction =BlendFunction.DARKEN}){
        super('Warpffect', 
        fragmentShader, 
        {
            blendFunction,
            uniforms: new Map([
               ['frequency', new Uniform(frequency)],
               ['amplitude', new Uniform(amplitude)],
               ['offset', new Uniform(0)],
               ['mouse', new Uniform(mouse)],
               ['mouseA', new Uniform({x:0, y:0})],
               
              
                  
            ])
        }
    )
       
    
    }

update(renderer, inputBuffer, deltaTime){
    this.uniforms.get('offset').value += deltaTime
    this.uniforms.get('offset').value += deltaTime
    this.uniforms.get('mouseA').value = this.uniforms.get('mouse').value.current
    
}

}
