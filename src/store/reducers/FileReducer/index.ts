import { Reducer } from "redux"
import { AnyAction } from "../../../models/IReduxProps"
import { UserActionGroup } from "../../../models/IUserActionProps"
import { FileReducerEnum } from "./actionTypes"

type FileReducerType = {
    dates: UserActionGroup[]
}

const defaultState: FileReducerType = {
    dates: []
}

const fileReducer: Reducer<FileReducerType, AnyAction> = (state = defaultState, action) => {
    switch (action.type) {
        case FileReducerEnum.SET_DATES:
            return { ...state, dates: action.payload }
        default:
            return state;
    }
}

export default fileReducer