import React from 'react';
import { Switch } from '../Switch/Switch';
import { Add } from '../Add/Add';
import { Remove } from '../Remove/Remove';
import { DropdownSelect } from '../DropdownSelect/DropdownSelect';
import { IngredientHeader } from '../IngredientHeader/IngredientHeader';
import styles from './IngredientSection.module.scss';

interface ExtraComponent {
  selectedItem: string;
}

interface Props {
  title: string;
  handleSwitch: () => void;
  items: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  extraComponents: ExtraComponent[];
  setExtraComponents: (extraComponents: ExtraComponent[]) => void;
  extraComponentHidden: Record<number, boolean>;
  setExtraComponentHidden: (updater: (prevHidden: Record<number, boolean>) => Record<number, boolean>) => void;
}

const IngredientSection: React.FC<Props> = ({
  title,
  handleSwitch,
  items,
  selectedItems,
  setSelectedItems,
  extraComponents,
  setExtraComponents,
  extraComponentHidden,
  setExtraComponentHidden,
}) => {
  const addExtraComponent = () => setExtraComponents([...extraComponents, { selectedItem: items[0] }]);

  const hideExtraComponent = (index: number) => {
    setExtraComponentHidden(prevHidden => ({ ...prevHidden, [index]: true }));
  };

  const handleSelectItem = (index: number) => (item: string) => {
    const newExtraComponents = [...extraComponents];
    newExtraComponents[index].selectedItem = item;
    setExtraComponents(newExtraComponents);
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <section className={styles.extra__ingredients_container}>
      <div className={styles.title__switch_wrapper}>
        <IngredientHeader>{title}</IngredientHeader>
        <Switch onChange={handleSwitch} />
      </div>
      <div className={styles.extra__ingredients_columns}>
        <div className={styles.add__more_wrapper}>
          <Add onClick={addExtraComponent} />
          <DropdownSelect items={items} onSelect={handleSelectItem(0)} selectedItem={extraComponents[0]?.selectedItem} />
        </div>
        {extraComponents.slice(1).map((component, index) => {
          const hidden = extraComponentHidden[index + 1];
          const componentClasses = `${styles.add__more_margin} ${hidden ? styles.hidden : ''}`;
          return (
            <div key={index} className={componentClasses}>
              <Remove onClick={() => hideExtraComponent(index + 1)} />
              <DropdownSelect items={items} onSelect={handleSelectItem(index + 1)} selectedItem={component.selectedItem} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IngredientSection;