import React, {useState} from 'react';
import styles from './App.module.css';

function App() {
    const [countValue, setCountValue] = useState<number>(0)
    const handleIncCount = () => {
        if(countValue < 5) {
            setCountValue(countValue + 1)
        }
    }
    const handleResetCount = () => {
        setCountValue(0)
    }


    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <div className={styles.display}>
                    <span>max value:</span>
                    <input type="number"/>
                    <span>start value:</span>
                    <input type="number"/>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.btn}>
                        set
                    </button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.display}>
                    <span className={countValue < 5 ? styles.countValue : `${styles.countValue} ${styles.redText}`}>
                        {countValue}
                    </span>
                </div>
                <div className={styles.buttons}>
                    <button className={countValue < 5 ? styles.btn : styles.btnDisabled}
                            onClick={handleIncCount}
                            disabled={countValue >=5}
                    >
                        inc
                    </button>
                    <button
                        className={styles.btn}
                        onClick={handleResetCount}
                    >
                        reset
                    </button>
                </div>

            </div>

        </div>
    );
}

export default App;
