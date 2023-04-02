import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './App.module.css';
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {
    changeDisplayStateAC,
    changeMaxValueAC,
    changeStartValueAC,
    incrementAC,
    resetAC,
    setAC
} from "./redux/counterReducer";

function App() {
    const startValue = useSelector<AppRootStateType, number>(state =>
        state.counter.startValue
    )
    const maxValue = useSelector<AppRootStateType, number>(state =>
        state.counter.maxValue
    )
    const displayValue = useSelector<AppRootStateType, number>(state =>
        state.counter.displayValue
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
    const handleOnChangeInputMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisplayActive) {
            dispatch(changeDisplayStateAC(false))
        }
        dispatch(changeMaxValueAC(+(e.currentTarget.value)))
    }
    const handleOnChangeInputStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisplayActive) {
            dispatch(changeDisplayStateAC(false))
        }
        dispatch(changeStartValueAC(+(e.currentTarget.value)))
    }
    const handleOnSetClick = () => {
        if (displayMessage !== 'incorrect') {
            dispatch(setAC())
        }
    }

    const displayMessage = startValue >= maxValue
    || startValue < 0
    || maxValue < 0 ? 'incorrect'
        : 'enter values and press \'set\''

    const displayClassName = startValue >= maxValue
    || startValue < 0
    || maxValue < 0
    || (displayValue === maxValue && isDisplayActive) ? styles.redText
        : styles.countValue

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <div className={styles.display}>
                    <span>max value:</span>
                    <input
                        type="number"
                        value={maxValue}
                        onChange={handleOnChangeInputMaxValue}
                    />
                    <span>start value:</span>
                    <input
                        type="number"
                        value={startValue}
                        onChange={handleOnChangeInputStartValue}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button className={isDisplayActive ? styles.btnDisabled : styles.btn}
                            disabled={isDisplayActive}
                            handleClick={handleOnSetClick}
                            title={'set'}
                    />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.display}>
                    <span className={displayClassName}>
                        {startValue >= maxValue || !isDisplayActive ? displayMessage : displayValue}
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
                </div>

            </div>

        </div>
    );
}

export default App;
