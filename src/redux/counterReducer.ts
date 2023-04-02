type IncrementAT = {
    type: 'INCREMENT-DISPLAY-VALUE'
}
type ResetAT = {
    type: 'RESET-DISPLAY-VALUE'
}
type SetAT = {
    type: 'SET-VALUES'
}
type ChangeDisplayStateAT = {
    type: 'CHANGE-DISPLAY-STATE'
    displayState: boolean
}
type ChangeMaxValueAT = {
    type: 'CHANGE-MAX-VALUE'
    maxValue: number
}
type ChangeStartValueAT = {
    type: 'CHANGE-START-VALUE'
    startValue: number
}
type AllActionTypes =
    ReturnType<typeof incrementAC>
    | ReturnType<typeof resetAC>
    | ReturnType<typeof setAC>
    | ReturnType<typeof changeDisplayStateAC>
    | ReturnType<typeof changeMaxValueAC>
    | ReturnType<typeof changeStartValueAC>

type InitialStateType = typeof initialState

const initialState = {
    startValue: 0,
    maxValue: 5,
    displayValue: 0,
    isDisplayActive: true
}

const counterReducer = (state: InitialStateType = initialState, action: AllActionTypes): InitialStateType => {
    switch (action.type) {
        case 'INCREMENT-DISPLAY-VALUE':
            return {
                ...state,
                displayValue: state.displayValue + 1
            }
        case 'RESET-DISPLAY-VALUE': {
            if (state.isDisplayActive) {
                return {
                    ...state,
                    displayValue: state.startValue
                }
            } else {
                return state
            }
        }
        case 'SET-VALUES':
            return {
                ...state,
                isDisplayActive: true,
                displayValue: state.startValue
            }
        case 'CHANGE-DISPLAY-STATE':
            return {
                ...state,
                isDisplayActive: action.displayState
            }
        case 'CHANGE-MAX-VALUE':
            return {
                ...state,
                maxValue: action.maxValue
            }
        case 'CHANGE-START-VALUE':
            return {
                ...state,
                startValue: action.startValue
            }
        default:
            return state
    }
}


export const incrementAC = (): IncrementAT => ({type: 'INCREMENT-DISPLAY-VALUE'})
export const resetAC = (): ResetAT => ({type: 'RESET-DISPLAY-VALUE'})
export const setAC = (): SetAT => ({type: 'SET-VALUES'})
export const changeDisplayStateAC = (displayState: boolean): ChangeDisplayStateAT => (
    {type: 'CHANGE-DISPLAY-STATE', displayState}
)
export const changeMaxValueAC = (maxValue: number): ChangeMaxValueAT => ({type: 'CHANGE-MAX-VALUE', maxValue})
export const changeStartValueAC = (startValue: number): ChangeStartValueAT => ({type: 'CHANGE-START-VALUE', startValue})

export default counterReducer