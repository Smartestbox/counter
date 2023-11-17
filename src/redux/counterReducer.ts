import {AppThunk} from "./store";

export type CounterActionTypes =
    | ReturnType<typeof incrementDisplayValueAC>
    | ReturnType<typeof resetAC>
    | ReturnType<typeof setValuesAC>
    | ReturnType<typeof changeDisplayValueAC>
    | ReturnType<typeof changeDisplayStateAC>
    | ReturnType<typeof changeMaxValueAC>
    | ReturnType<typeof changeStartValueAC>

type InitialStateType = typeof initialState

const initialState = {
    values: {
        startValue: 0,
        maxValue: 5,
        displayValue: 0,
    },
    isDisplayActive: false
}

export const counterReducer = (state: InitialStateType = initialState, action: CounterActionTypes): InitialStateType => {
    switch (action.type) {
        case 'INCREMENT-DISPLAY-VALUE':
            return {
                ...state,
                values: {...state.values, displayValue: state.values.displayValue + 1}
            }
        case 'RESET-DISPLAY-VALUE': {
            if (state.isDisplayActive) {
                return {
                    ...state,
                    values: {...state.values, displayValue: state.values.startValue}
                }
            } else {
                return state
            }
        }
        case 'SET-VALUES':
            return {
                ...state,
                isDisplayActive: true,
                values: {...state.values, displayValue: state.values.startValue}
            }
        case "CHANGE-DISPLAY-VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    displayValue: action.value
                }
            }
        case 'CHANGE-DISPLAY-STATE':
            return {
                ...state,
                isDisplayActive: action.displayState
            }
        case 'CHANGE-MAX-VALUE':
            return {
                ...state,
                values: {...state.values, maxValue: action.maxValue}
            }
        case 'CHANGE-START-VALUE':
            return {
                ...state,
                values: {...state.values, startValue: action.startValue}
            }
        default:
            return state
    }
}

// Actions

export const incrementDisplayValueAC = () => ({type: 'INCREMENT-DISPLAY-VALUE'} as const)
export const resetAC = () => ({type: 'RESET-DISPLAY-VALUE'} as const)
export const setValuesAC = () => ({type: 'SET-VALUES'} as const)
export const changeDisplayValueAC = (value: number) => ({type: 'CHANGE-DISPLAY-VALUE', value} as const)
export const changeDisplayStateAC = (displayState: boolean) =>
    ({type: 'CHANGE-DISPLAY-STATE', displayState} as const)
export const changeMaxValueAC = (maxValue: number) =>
    ({type: 'CHANGE-MAX-VALUE', maxValue} as const)
export const changeStartValueAC = (startValue: number) =>
    ({type: 'CHANGE-START-VALUE', startValue} as const)

// Thunks

export const getValuesTC = (): AppThunk =>
    (dispatch) => {
        const startValueStr = localStorage.getItem('start-value')
        if(startValueStr) {
            const startValueNum = JSON.parse(startValueStr)
            dispatch(changeStartValueAC(startValueNum))
        }
        const maxValueStr = localStorage.getItem('max-value')
        if(maxValueStr) {
            const maxValueNum = JSON.parse(maxValueStr)
            dispatch(changeMaxValueAC(maxValueNum))
        }
        const displayValueStr = localStorage.getItem('display-value')
        if(displayValueStr) {
            const displayValueNum = JSON.parse(displayValueStr)
            dispatch(changeDisplayValueAC(displayValueNum))
        }
        const displayStateStr = localStorage.getItem('display-state')
        if(displayStateStr) {
            const displayStateBoolean = JSON.parse(displayStateStr)
            dispatch(changeDisplayStateAC(displayStateBoolean))
        }
    }

export const setValuesTC = (): AppThunk =>
    (dispatch, getState) => {
        dispatch(setValuesAC())

        localStorage.setItem('start-value', JSON.stringify(getState().counter.values.startValue))
        localStorage.setItem('max-value', JSON.stringify(getState().counter.values.maxValue))
        localStorage.setItem('display-value', JSON.stringify(getState().counter.values.displayValue))
        localStorage.setItem('display-state', JSON.stringify(getState().counter.isDisplayActive))
    }

export const incrementTC = (): AppThunk =>
    (dispatch, getState) => {
        dispatch(incrementDisplayValueAC())
        localStorage.setItem('display-value', JSON.stringify(getState().counter.values.displayValue))
    }

export const changeDisplayStateTC = (displayState: boolean): AppThunk =>
    (dispatch, getState) => {
        dispatch(changeDisplayStateAC(displayState))
        localStorage.setItem('display-state', JSON.stringify(getState().counter.isDisplayActive))
    }

export const resetTC = (): AppThunk =>
    (dispatch, getState) => {
        dispatch(resetAC())
        localStorage.setItem('display-value', JSON.stringify(getState().counter.values.displayValue))
    }