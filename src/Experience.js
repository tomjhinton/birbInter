import { OrbitControls , shaderMaterial, Center} from '@react-three/drei'
import { Perf } from 'r3f-perf'

import VertexShader from './shaders/Vertex.js'
import FragmentShader from './shaders/Fragment.js'
import * as THREE from 'three'
import { useFrame, extend} from '@react-three/fiber'
import { useRef } from 'react'

import { BlendFunction } from 'postprocessing'
import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'

import Warp from './Warp.js'

const boxGeometry =  new THREE.BoxGeometry( 5, 5, 5 );

export default function Experience(){

   
    const boxes = useRef([])
    const mouse = useRef()

    useFrame((state, delta) => {
        boxMaterial.current.u_time += delta
        
        mouse.current = state.pointer
        boxes.current.map(x=> {
            x.rotation.y +=delta *.1
            x.material.needsUpdate = true
            x.material.uniforms.u_time.value += delta
           
        })
    })

    const eventHandler = (event) =>
    {
        // console.log(event.object.material.uniforms.mouse)
        event.object.material.uniforms.mouse.value.x = event.point.x
        event.object.material.uniforms.mouse.value.x = event.point.y
        boxMaterial.current.mouse = {x:event.point.x, y: event.point.y}
        boxMaterial.needsUpdate = true
        warpRef.current.amplitude = event.point.y
    }

    const boxMaterial = useRef()

    const BoxMaterial = shaderMaterial(

        {
            u_time: 0,
            uColorStart : new THREE.Color('#ffffff') ,
            uColorEnd : new THREE.Color('#000000'),
            mouse: {x:0, y:0}

        },
        VertexShader,
        FragmentShader
    )
    extend({BoxMaterial})
    

    const warpRef = useRef()

    

    return <>
    <color args={ ['#ffffff']} attach={'background'} />
    {/* <Perf position="top-left" /> */}
<EffectComposer >
    
    <Warp 
    ref={ warpRef }
    frequency={ 20 }
    amplitude={ 0.1 }
    blendFunction={ BlendFunction.DARKEN}
    mouse={mouse}
    />

    </EffectComposer>
    <Center>
        <OrbitControls makeDefault enableZoom={false}/>
        

        {[...Array(50)].map((x, index) => {
                return < mesh onClick={eventHandler} 
                ref={ (element)=> boxes.current[index] = element }
                key={index}
                geometry={boxGeometry} 
                
                position={[(Math.random()-.5) * 10, (Math.random()-.5) * 10, (Math.random()-.5) * 10]}
                scale={0.2 + Math.random() * .2}
                rotation= {[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}>
                
                <boxMaterial transparent ref={boxMaterial} />
            </mesh>
            })  
            
            
            }
    </Center>
    </>
}