import React, {useEffect} from 'react';
import styles from './App.module.css';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import Settings from "./Components/Settings";
import Display from "./Components/Display";
import {getValuesTC} from "./redux/counterReducer";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getValuesTC())
    }, []);

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
