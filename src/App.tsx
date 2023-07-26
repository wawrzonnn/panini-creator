import './App.scss'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from './views/WelcomeScreen/WelcomeScreen'
import PaniniCreator from './views/PaniniCreator/PaniniCreator'

enum Screens {
  Welcome = 'welcome',
  Panini = 'panini',
  Success = 'success',
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.Welcome)

  const handleStart = () => {
    setCurrentScreen(Screens.Panini)
  }

  return (
    <AnimatePresence mode="wait">
      {currentScreen === Screens.Welcome && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === Screens.Panini && <PaniniCreator />}
    </AnimatePresence>
  )
}

export default App
