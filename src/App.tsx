import './App.scss'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './views/SplashScreen/SplashScreen'
import PaniniCreator from './views/PaniniCreator/PaniniCreator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true)
  }

  return (
    <Router>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SplashScreen isOrderPlaced={isOrderPlaced} />} />
        <Route path="/panini" element={<PaniniCreator onPlaceOrder={handlePlaceOrder} />} />
        <Route path="/" element={<SplashScreen isOrderPlaced={isOrderPlaced} />} />
      </Routes>
    </AnimatePresence>
  </Router>
  )
}

export default App