/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import {
  Grid,
  OrbitControls
} from '@react-three/drei'
import React from 'react'
import { Perf } from 'r3f-perf'

// styles
import './scene.scss'

// components
import Earth from 'components/earth'

const sampleGpsData = [
  { lat: 37.7749, lng: -122.4194, color: { r: 1.0, g: 0.0, b: 0.0 } },
  { lat: 51.5074, lng: -0.1278, color: { r: 0.0, g: 1.0, b: 0.0 } },
  { lat: 40.7128, lng: -74.0060, color: { r: 0.0, g: 0.0, b: 1.0 } },
  { lat: 35.6895, lng: 139.6917, color: { r: 1.0, g: 1.0, b: 0.0 } },
  { lat: 55.7558, lng: 37.6173, color: { r: 1.0, g: 0.0, b: 1.0 } },
  { lat: 48.8566, lng: 2.3522, color: { r: 0.0, g: 1.0, b: 1.0 } },
  { lat: -23.5505, lng: -46.6333, color: { r: 0.5, g: 0.5, b: 0.0 } },
  { lat: 28.7041, lng: 77.1025, color: { r: 0.5, g: 0.0, b: 0.5 } },
  { lat: 39.9042, lng: 116.4074, color: { r: 0.0, g: 0.5, b: 0.5 } },
  { lat: -33.8688, lng: 151.2093, color: { r: 0.8, g: 0.2, b: 0.2 } }
]

const Scene: React.FC = () => {
  return (
    <div className="h-full">
      <Canvas
        gl={{ logarithmicDepthBuffer: true, alpha: true }}
        shadows
        camera={{ position: [-15, 4, 10], fov: 25 }}
      >
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <ambientLight intensity={1} />
        <Earth gpsData={sampleGpsData}/>
        <Grid
          renderOrder={-1}
          position={[0, 0, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={[0.5, 0.5, 10] as unknown as number}
          fadeDistance={30}
        />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.2}
          makeDefault
          enableDamping={false}
        />
        <Perf matrixUpdate deepAnalyze overClock />
      </Canvas>
     </div>
  )
}

export default Scene
