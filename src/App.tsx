import "./App.scss";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './views/WelcomeScreen/WelcomeScreen';
import PaniniCreator from './views/PaniniCreator/PaniniCreator';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'panini' | 'success'>('welcome');

  const handleStart = () => {
    setCurrentScreen('panini');
  };


  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'panini' && <PaniniCreator/>}

    </AnimatePresence>
  );
};

export default App;
