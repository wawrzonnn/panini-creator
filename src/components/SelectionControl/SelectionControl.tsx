import React from 'react';
import { DropdownSelect } from '../DropdownSelect/DropdownSelect';
import { CarouselSelect } from '../CarouselSelect/CarouselSelect';

interface Props {
  type: 'dropdown' | 'carousel';
  items: string[];
  onSelect: (item: string) => void;
}

const SelectionControl: React.FC<Props> = ({ type, items, onSelect }) => {
  switch (type) {
    case 'dropdown':
      return <DropdownSelect items={items} onSelect={onSelect} />;
    case 'carousel':
      return <CarouselSelect items={items} onSelect={onSelect} />;
    default:
      return null;
  }
};

export default SelectionControl;