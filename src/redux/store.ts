import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CounterActionTypes, counterReducer} from "./counterReducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export const useAppDispatch = useDispatch<AppDispatchType>

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, CounterActionTypes>

// @ts-ignore
window.store = store