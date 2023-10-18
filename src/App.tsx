import React, {ChangeEvent} from 'react';
import styles from './App.module.css';
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
import Settings from "./Settings";
import Display from "./Display";

function App() {

    const isDisplayActive = useSelector<AppRootStateType, boolean>(state =>
        state.counter.isDisplayActive
    )

    const dispatch = useDispatch()




    return (
        <div className={styles.App}>
            <div>
                {isDisplayActive ? <Display /> : <Settings />}
            </div>
        </div>
    );
}

export default App;
