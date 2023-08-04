import React from 'react';
import { Controller } from 'react-hook-form';
import { CheckboxSelect } from '../../../components/CheckboxSelect/CheckboxSelect';
import { IngredientHeader } from '../../../components/IngredientHeader/IngredientHeader';
import styles from './ControlledCheckboxSection.module.scss';

interface ControlledCheckboxSectionProps {
    name: string;
    label: string;
    control: any;
  }


export const ControlledCheckboxSection = ({ name, label, control }: ControlledCheckboxSectionProps) => (
  <section className={styles.ingredients_container_center}>
    <IngredientHeader>{label}</IngredientHeader>
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <CheckboxSelect
            label={'ADD TO ORDER'}
            onChange={(e) => field.onChange(e.target.checked)}
            name={name}
          />
        )}
      />
    </div>
  </section>
);

export default ControlledCheckboxSection;