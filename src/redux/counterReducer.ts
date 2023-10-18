
type AllActionTypes =
    ReturnType<typeof incrementAC>
    | ReturnType<typeof resetAC>
    | ReturnType<typeof setAC>
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
    isDisplayActive: true
}

const counterReducer = (state: InitialStateType = initialState, action: AllActionTypes): InitialStateType => {
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

export const incrementAC = () => ({type: 'INCREMENT-DISPLAY-VALUE'} as const)
export const resetAC = () => ({type: 'RESET-DISPLAY-VALUE'} as const)
export const setAC = () => ({type: 'SET-VALUES'} as const)
export const changeDisplayStateAC = (displayState: boolean) =>
    ({type: 'CHANGE-DISPLAY-STATE', displayState} as const)
export const changeMaxValueAC = (maxValue: number) =>
    ({type: 'CHANGE-MAX-VALUE', maxValue} as const)
export const changeStartValueAC = (startValue: number) =>
    ({type: 'CHANGE-START-VALUE', startValue} as const)

export default counterReducer