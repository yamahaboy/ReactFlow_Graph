import { UserActionGroup } from "../../../models/IUserActionProps";
import { FileReducerEnum } from "./actionTypes";

export const setDates = (dates: UserActionGroup[]) => {
    console.log(dates)
    return { type: FileReducerEnum.SET_DATES, payload: dates }
}