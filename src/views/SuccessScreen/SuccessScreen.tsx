import React, { useState } from 'react'
import styles from './SuccessScreen.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

const SuccessScreen= () => {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<>
			<div className={styles.container}>
					<button>ORDER</button>
			</div>
		</>
	)
}

export default SuccessScreen
