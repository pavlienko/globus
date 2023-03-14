import React from 'react'

// styles
import './landing.scss'

// components
import Scene from 'components/scene'
import Menu from 'components/menu'

const Landing: React.FC = () => {
  return (
    <div className='w-full min-h-[600px] max-h-[800px] flex border-b landing'>
      <div className='grow landing__viz'>
        <div className='absolute p-4'>
          <h1>Data visualization</h1>
        </div>
        <Scene />
      </div>
      <div className='min-w-[40%] border-l p-4'>
        <Menu />
      </div>
    </div>
  )
}

export default Landing
