import { UserActionGroup } from "../../../models/IUserActionProps";
import { FileReducerEnum } from "./actionTypes";

export const setDates = (dates: UserActionGroup[]) => {
    return { type: FileReducerEnum.SET_DATES, payload: dates }
}

export const setSelectedUser = (selectedUser: UserActionGroup) => {
    return { type: FileReducerEnum.SELECTED_USER, payload: selectedUser }
}