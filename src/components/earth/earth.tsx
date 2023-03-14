/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react'
import { type ShaderMaterial } from 'three'
import { useTexture } from '@react-three/drei'
import earthTexture from 'assets/images/earth-mask.jpg'

const Earth: React.FC<{
  gpsData: Array<{
    lat: number
    lng: number
    color: { r: number, g: number, b: number }
  }>
}> = ({ gpsData }) => {
  const earthMap = useTexture({ earthTexture })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const refMat = useRef<ShaderMaterial>(null!)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function gpsToSphere (lat: number, lng: number, radius = 3) {
    const latRad = ((90 - lat) * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180

    const x = radius * Math.sin(latRad) * Math.cos(lngRad)
    const y = radius * Math.sin(latRad) * Math.sin(lngRad)
    const z = radius * Math.cos(latRad)

    return { x, y, z }
  }

  const sphereData = gpsData.map(({ lat, lng, color }) => {
    const { x, y, z } = gpsToSphere(lat, lng)
    return { x, y, z, color }
  })

  const uniforms = useMemo(() => {
    const data = new Float32Array(sphereData.length * 6)
    sphereData.forEach(({ x, y, z, color }, index) => {
      data[index * 6] = x
      data[index * 6 + 1] = y
      data[index * 6 + 2] = z
      data[index * 6 + 3] = color.r
      data[index * 6 + 4] = color.g
      data[index * 6 + 5] = color.b
    })
    return {
      u_sphereData: { value: data },
      u_dataLength: { value: sphereData.length },
      u_texture: { type: 't', value: earthMap }
    }
  }, [sphereData])

  const vertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

  const fragmentShader = `
  precision mediump float;

  uniform vec4 u_sphereData[${sphereData.length}];
  uniform int u_dataLength;
  uniform sampler2D uImage;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  vec3 calculateColor(vec3 normal, int index) {
    vec3 position = u_sphereData[index].xyz;
    vec3 color = u_sphereData[index].rgb;

    float influence = max(0.0, dot(normal, normalize(position)));
    influence = smoothstep(0.0, 1.0, influence);

    return color * influence;
  }

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 color = vec3(0.0);

    for (int i = 0; i < ${sphereData.length}; i++) {
      if (i >= u_dataLength) break;
      color += calculateColor(normal, i);
    }

    vec4 earth = texture2D(uImage, vUv);
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = earth;
  }`

  return (
    <mesh>
      <sphereGeometry args={[3, 32, 32]} />
      <shaderMaterial
        ref={refMat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default Earth
