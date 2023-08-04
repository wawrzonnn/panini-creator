import './App.scss'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './views/SplashScreen/SplashScreen'
import PaniniCreator from './views/PaniniCreator/PaniniCreator'

enum Screens {
  Welcome = 'welcome',
  Panini = 'panini',
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.Welcome)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setCurrentScreen(Screens.Panini)
  }

  const handlePlaceOrder = () => {
    setIsExiting(true)
    setIsOrderPlaced(true)
    setTimeout(() => {
      setCurrentScreen(Screens.Welcome)
      setIsExiting(false)
    }, 1000) 
  }
  return (
     <AnimatePresence mode="wait">
      {currentScreen === Screens.Welcome && <SplashScreen onStart={handleStart} isOrderPlaced={isOrderPlaced} />}
      {currentScreen === Screens.Panini && <PaniniCreator onPlaceOrder={handlePlaceOrder} />}
    </AnimatePresence>
  )
}

export default App
