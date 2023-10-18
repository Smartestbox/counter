import React from 'react';
import styles from './App.module.css';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import Settings from "./Settings";
import Display from "./Display";

function App() {

    const isDisplayActive = useSelector<AppRootStateType, boolean>(state =>
        state.counter.isDisplayActive
    )

    return (
        <div className={styles.App}>
            <div>
                {isDisplayActive ? <Display /> : <Settings />}
            </div>
        </div>
    );
}

export default App;
