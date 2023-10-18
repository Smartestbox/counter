import React, {ChangeEvent} from 'react';
import styles from "./App.module.css";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {changeDisplayStateAC, changeMaxValueAC, changeStartValueAC, setAC} from "./redux/counterReducer";

const Settings = () => {

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

    const displayMessage = startValue >= maxValue // useState + useEffect
    || startValue < 0
    || maxValue < 0 ? 'incorrect'
        : 'enter values and press \'set\''

    const displayClassName = startValue >= maxValue // useState + useEffect
    || startValue < 0
    || maxValue < 0
    || (displayValue === maxValue && isDisplayActive) ? styles.redText
        : styles.countValue

    return (
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
            <div className={styles.displayMessage}>
                <span className={displayClassName}>{displayMessage}</span>
            </div>
            <div className={styles.buttons}>
                <Button className={displayMessage === 'incorrect' ? styles.btnDisabled : styles.btn}
                        disabled={displayMessage === 'incorrect'}
                        handleClick={handleOnSetClick}
                        title={'set'}
                />
            </div>
        </div>
    );
};

export default Settings;