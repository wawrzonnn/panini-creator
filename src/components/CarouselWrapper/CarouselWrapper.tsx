import React from 'react'
import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { Add } from '../Add/Add'
import styles from './CarouselWrapper.module.scss'

interface CarouselWrapperProps {
	items: string[]
	addExtraComponent: () => void
	onSelect: (selectedItem: string) => void
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ items, addExtraComponent, onSelect }) => {
	return (
		<div className={styles.carousel__wrapper}>
			<Add onClick={addExtraComponent} />
			<CarouselSelect items={items} onSelect={onSelect} />
		</div>
	)
}

export default CarouselWrapper
