import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from "../App.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../redux/store";
import {
    changeDisplayStateAC,
    changeMaxValueAC,
    changeStartValueAC,
    setValuesTC
} from "../redux/counterReducer";
import Button from "./Button";

const Settings = () => {

    const [displayMessage, setDisplayMessage] = useState<string>('enter values and press \'set\'')

    const [displayClassName, setDisplayClassName] = useState(styles.countValue) // how to type css objs

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

    const dispatch = useAppDispatch()

    useEffect(() => {
        startValue >= maxValue || startValue < 0 || maxValue < 0
            ? setDisplayMessage('incorrect values')
            : setDisplayMessage('enter values and press \'set\'')
    }, [startValue, maxValue])

    useEffect(() => {
        startValue >= maxValue || startValue < 0 || maxValue < 0 || (displayValue === maxValue && isDisplayActive)
            ? setDisplayClassName(styles.redText)
            : setDisplayClassName(styles.countValue)
    }, [startValue, maxValue, displayValue, isDisplayActive])

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

    const handleOnSetClick = useCallback(() => {
        if (displayMessage !== 'incorrect values') {
            dispatch(setValuesTC())
        }
    }, [displayMessage])

    return (
        <div className={styles.container}>
            <div className={styles.display}>
                <span>start value:</span>
                <input
                    type="number"
                    value={startValue}
                    onChange={handleOnChangeInputStartValue}
                />
                <span>max value:</span>
                <input
                    type="number"
                    value={maxValue}
                    onChange={handleOnChangeInputMaxValue}
                />
            </div>
            <div className={styles.displayMessage}>
                <span className={displayClassName}>{displayMessage}</span>
            </div>
            <div className={styles.buttons}>
                <Button className={displayMessage === 'incorrect values' ? styles.btnDisabled : styles.btn}
                        disabled={displayMessage === 'incorrect values'}
                        handleClick={handleOnSetClick}
                        title={'set'}
                />
            </div>
        </div>
    );
};

export default Settings;