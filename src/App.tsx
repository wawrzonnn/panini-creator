import "./App.scss";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './views/WelcomeScreen/WelcomeScreen';
import PaniniCreator from './views/PaniniCreator/PaniniCreator';
import FarewellScreen from './views/SuccessScreen/SuccessScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'panini' | 'success'>('welcome');

  const handleStart = () => {
    setCurrentScreen('panini');
  };

  const handleOrder = () => {
    setCurrentScreen('success');
  };

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'panini' && <PaniniCreator onOrder={handleOrder} />}
      {currentScreen === 'success' && <FarewellScreen />}
    </AnimatePresence>
  );
};

export default App;