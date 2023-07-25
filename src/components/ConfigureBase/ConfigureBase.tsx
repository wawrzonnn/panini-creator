import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'
import { Remove } from '../Remove/Remove'
import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { IngredientHeader } from '../IngredientHeader/IngredientHeader'
import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'
import { SwitchWrapper } from '../SwitchWrapper/SwitchWrapper'
import { DropdownWrapper } from '../DropdownWrapper/DropdownWrapper'
import { CarouselWrapper } from '../CarouselWrapper/CarouselWrapper'
const ConfigureBase = () => {
    const [selectedBread, setSelectedBread] = useState(breadVariants[0])
    const [selectedCheese, setSelectedCheese] = useState(cheeseVariants[0])
    const [selectedMeat, setSelectedMeat] = useState(meatVariants[0])
    const [selectedDressing, setSelectedDressing] = useState(meatVariants[0])
    const [switchOn, setSwitchOn] = useState<boolean>(true)
    const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

    const [extraCheeseComponents, setExtraCheeseComponents] = useState<any[]>([])
    const [extraMeatComponents, setExtraMeatComponents] = useState<any[]>([])
    const [extraDressingComponents, setExtraDressingComponents] = useState<any[]>([])
    const [extraCheeseComponentHidden, setExtraCheeseComponentHidden] = useState<Record<number, boolean>>({})
    const [extraMeatComponentHidden, setExtraMeatComponentHidden] = useState<Record<number, boolean>>({})
    const [extraDressingComponentHidden, setExtraDressingComponentHidden] = useState<Record<number, boolean>>({})

    const addExtraCheeseComponent = () => setExtraCheeseComponents([...extraCheeseComponents, {}])
    const addExtraMeatComponent = () => setExtraMeatComponents([...extraMeatComponents, {}])
    const addExtraDressingComponent = () => setExtraDressingComponents([...extraDressingComponents, {}])

    const hideExtraCheeseComponent = (index: number) => {
        setExtraCheeseComponentHidden(prevHidden => ({ ...prevHidden, [index]: true }))
    }

    const hideExtraMeatComponent = (index: number) => {
        setExtraMeatComponentHidden(prevHidden => ({ ...prevHidden, [index]: true }))
    }

    const hideExtraDressingComponent = (index: number) => {
        setExtraDressingComponentHidden(prevHidden => ({ ...prevHidden, [index]: true }))
    }

    const handleSwitch = () => {
        setSwitchOn(!switchOn)
    }

    return (
        <form>
            <div className={styles.header}>
                <span className={styles.header__title}>Panini Creator</span>
                <button className={styles.header__button}>
                    <Dices />
                    RANDOMIZE PANINI
                </button>
            </div>

            <main className={styles.form__wrapper}>
                <span className={styles.form__title}>CONFIGURE BASE</span>
                <div className={styles.bread__wrapper}>
                    <IngredientHeader>Bread</IngredientHeader>
                    <CarouselSelect items={breadVariants} onSelect={setSelectedBread} icon={breadIcon} />
                </div>

                <section className={styles.extra__ingredients_container}>
				<SwitchWrapper title={'Cheese'} handleSwitch={handleSwitch} />
                    <div className={styles.extra__ingredients_columns}>
						<DropdownWrapper items={cheeseVariants} addExtraComponent={addExtraCheeseComponent} onSelect={setSelectedCheese} />
                        {switchOn && extraCheeseComponents.map((_, index) => {
                            const hidden = extraCheeseComponentHidden[index]
                            const componentClasses = `${styles.add__more_margin} ${hidden ? styles.hidden : ''}`
                            return (
                                <div key={index}>
                                    <div className={componentClasses}>
                                        <Remove onClick={() => hideExtraCheeseComponent(index)} />
                                        <DropdownSelect items={cheeseVariants} onSelect={setSelectedCheese} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className={styles.extra__ingredients_container}>
                 <SwitchWrapper title={'Meat'} handleSwitch={handleSwitch} />
                    <div className={styles.extra__ingredients_columns}>
						<DropdownWrapper items={meatVariants} addExtraComponent={addExtraMeatComponent} onSelect={setSelectedMeat} />
                        {switchOn && extraMeatComponents.map((_, index) => {
                            const hidden = extraMeatComponentHidden[index]
                            const componentClasses = `${styles.add__more_margin} ${hidden ? styles.hidden : ''}`
                            return (
                                <div key={index}>
                                    <div className={componentClasses}>
                                        <Remove onClick={() => hideExtraMeatComponent(index)} />
                                        <DropdownSelect items={meatVariants} onSelect={setSelectedMeat} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

				<section className={styles.extra__ingredients_container}>
                 <SwitchWrapper title={'Dressing'} handleSwitch={handleSwitch} />
                    <div className={styles.extra__ingredients_columns}>
						<CarouselWrapper items={dressingVariants} addExtraComponent={addExtraDressingComponent} onSelect={setSelectedDressing} />
                        {switchOn && extraDressingComponents.map((_, index) => {
                            const hidden = extraDressingComponentHidden[index]
                            const componentClasses = `${styles.add__more_margin} ${hidden ? styles.hidden : ''}`
                            return (
                                <div key={index}>
                                    <div className={componentClasses}>
                                        <Remove onClick={() => hideExtraDressingComponent(index)} />
                                        <CarouselSelect items={dressingVariants} onSelect={setSelectedDressing} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

            </main>
        </form>
    )
}

export default ConfigureBase