import React, {useCallback} from 'react';
import styles from "../App.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../redux/store";
import {
    changeDisplayStateTC,
    incrementTC,
    resetTC
} from "../redux/counterReducer";
import Button from "./Button";



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
    const dispatch = useAppDispatch()

    const handleOnIncClick = useCallback(() => {
        if (displayValue < maxValue && isDisplayActive) {
            dispatch(incrementTC())
        }
    }, [displayValue, maxValue, isDisplayActive])

    const handleOnResetClick = useCallback(() => {
        if (isDisplayActive) {
            dispatch(resetTC())
        }
    }, [isDisplayActive] )

    const handleOnSettingsClick = useCallback(() => {
        dispatch(changeDisplayStateTC(false))
    }, [] )

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