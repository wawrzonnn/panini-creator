import React from 'react';
import styles from './Add.module.scss';

interface AddProps {
    onClick?: () => void;
}

export const Add: React.FC<AddProps> = ({ onClick }) => {
    return (
        <div className={styles.circle} onClick={onClick}>
            <span className={styles.plus}>+</span>
        </div>
    );
};

export default Add;