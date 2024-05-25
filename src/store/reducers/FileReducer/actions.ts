import { UserActionGroup } from "../../../models/IUserActionProps";
import { FileReducerEnum } from "./actionTypes";

export const setDates = (dates: UserActionGroup[]) => {
    return { type: FileReducerEnum.SET_DATES, payload: dates }
}

export const setSelectedUser = (selectedUser: UserActionGroup) => {
    console.log(selectedUser, "selectedUser")
    return { type: FileReducerEnum.SELECTED_USER, payload: selectedUser }
}


export const setUserActionList = (userActionList: Map<string, string[]>) => {
    return { type: FileReducerEnum.SET_USER_ACTION_LIST, payload: userActionList }
}