import React from 'react'
import './app.module.scss'

// Components
import Header from 'components/header'
import Landing from 'components/landing'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Landing />
    </div>
  )
}

export default App
