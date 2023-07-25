import "./App.scss";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './views/WelcomeScreen/WelcomeScreen';


const App: React.FC = () => {

  return (
    <WelcomeScreen />
  );
};

export default App;