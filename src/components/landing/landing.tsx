import React from 'react'

// styles
import './landing.module.scss'

// components
import Scene from 'components/scene'
import Menu from 'components/menu'

const Landing: React.FC = () => {
  return (
    <div className='w-full flex'>
      <div className='w-[60%]'>
        <h1>Globus Project</h1>
        <Scene />
      </div>
      <div className='grow'>
      <Menu />
      </div>
    </div>
  )
}

export default Landing
