import React, {ChangeEvent, useState} from 'react';
import styles from './App.module.css';
import Button from "./Button";

function App() {
    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(5)
    const [displayValue, setDisplayValue] = useState<number>(startValue)
    const [isDisplayActive, setIsDisplayActive] = useState<boolean>(true)
    const handleOnIncClick = () => {
        if (displayValue < maxValue && isDisplayActive) {
            setDisplayValue(displayValue + 1)
        }
    }
    const handleOnResetClick = () => {
        if(isDisplayActive) {
            setDisplayValue(startValue)
        }
    }

    const handleOnChangeInputMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisplayActive) {setIsDisplayActive(false)}
        setMaxValue(+(e.currentTarget.value))
    }
    const handleOnChangeInputStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        setIsDisplayActive(false)
        setStartValue(+(e.currentTarget.value))
    }

    const handleOnSetClick = () => {
        if(displayMessage !== 'incorrect') {
            setIsDisplayActive(true)
            setDisplayValue(startValue)
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
                            handleClick={handleOnSetClick}
                    >
                        set
                    </Button>
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
                            handleClick={handleOnIncClick}
                    >
                        inc
                    </Button>
                    <Button
                        className={startValue < maxValue && isDisplayActive ? styles.btn : styles.btnDisabled}
                        handleClick={handleOnResetClick}
                    >
                        reset
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default App;
