import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import styles from './PaniniCreator.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import ConfigureBase from '../../components/ConfigureBase/ConfigureBase'

const PaniniCreator = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 500)
	}, [])
	const getH1Classes = cx({
		[styles.panini__visible]: isVisible,
		[styles.panini__hidden]: !isVisible,
	})

	return (
		<>
			<motion.div
				className={styles.container}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 2 }}>
				<ConfigureBase />
			</motion.div>
		</>
	)
}

export default PaniniCreator
