import React from 'react';
import { Switch } from '../Switch/Switch';
import { IngredientHeader } from '../IngredientHeader/IngredientHeader';
import styles from './SwitchWrapper.module.scss';

interface SwitchWrapperProps {
  title: string;
  handleSwitch: () => void;
}

export const SwitchWrapper: React.FC<SwitchWrapperProps> = ({ title, handleSwitch }) => {
  return (
    <div className={styles.switch__wrapper}>
      <IngredientHeader>{title}</IngredientHeader>
      <Switch onChange={handleSwitch} />
    </div>
  );
};

export default SwitchWrapper;