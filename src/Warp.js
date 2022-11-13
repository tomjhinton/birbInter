import { forwardRef } from "react"
import WarpEffect from "./WarpEffect"
import { useFrame } from "@react-three/fiber"


export default forwardRef(function Warp(props, ref){

    // useFrame((state, delta) => {
    //     console.log(state.pointer)
    // })

    const effect = new WarpEffect(props, ref)

    return <primitive ref={ ref } object={ effect } />
})