export default /* glsl */`uniform float uTime;
uniform vec2 mouse;
varying vec2 vUv;
uniform float u_time;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .15) );
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .15));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .15) );
    
  } 
void main()


{
    vec2 uv = (vUv);

    float t = (u_time *.4) +length(uv-.5);
  
    float t2 = (u_time *.2) +length(uv-.5);
    

    float alpha = 1.;
    
    vec2 uv2 = fract(vec2(uv.x, uv.y) * 2.);
  
    vec2 uv3 = fract(vec2(uv.x, uv.y) * 4.);
   
     vec2 uv4 = fract(vec2(uv.x, uv.y) * 8.);
   
       vec2 uv5 = fract(vec2(uv.x, uv.y) * 16.);
   
  
  vec3 color = vec3(1.);
   
   color = mix(color, vec3(1.-color), step(length(uv2-.5), sin(t)));
   
     color = mix(color, vec3(1.-color), step(length(uv3-.5), sin(t2)));
   
       color = mix(color, vec3(1.-color), step(length(uv4-.5), sin(t)));
   
        color = mix(color, vec3(1.-color), step(length(uv5-.5), sin(t2)));

    if(color == vec3(1.)){
        alpha = 0.;
    }

    gl_FragColor = vec4(color, alpha);
}`