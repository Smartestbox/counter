import React from 'react';
import styles from "./App.module.css";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {changeDisplayStateAC, incrementAC, resetAC} from "./redux/counterReducer";



const Display = () => {

    const startValue = useSelector<AppRootStateType, number>(state =>
        state.counter.values.startValue
    )
    const maxValue = useSelector<AppRootStateType, number>(state =>
        state.counter.values.maxValue
    )
    const displayValue = useSelector<AppRootStateType, number>(state =>
        state.counter.values.displayValue
    )
    const isDisplayActive = useSelector<AppRootStateType, boolean>(state =>
        state.counter.isDisplayActive
    )
    const dispatch = useDispatch()

    const handleOnIncClick = () => {
        if (displayValue < maxValue && isDisplayActive) {
            dispatch(incrementAC())
        }
    }

    const handleOnResetClick = () => {
        if (isDisplayActive) {
            dispatch(resetAC())
        }
    }

    const handleOnSettingsClick = () => {
        dispatch(changeDisplayStateAC(false))
    }

    return (
        <div className={styles.container}>
            <div className={styles.display}>
                    <span className={maxValue === displayValue ? styles.redText : styles.countValue}>
                        {displayValue}
                    </span>
            </div>
            <div className={styles.buttons}>
                <Button className={displayValue < maxValue && isDisplayActive ? styles.btn : styles.btnDisabled}
                        disabled={!isDisplayActive}
                        handleClick={handleOnIncClick}
                        title={'inc'}
                />
                <Button
                    className={displayValue > startValue && isDisplayActive ? styles.btn : styles.btnDisabled}
                    disabled={displayValue === startValue}
                    handleClick={handleOnResetClick}
                    title={'reset'}
                />
                <Button
                    className={styles.btn}
                    handleClick={handleOnSettingsClick}
                    title={'settings'}
                />
            </div>
        </div>
    )
};

export default Display;