import { Reducer } from "redux";
import { AnyAction } from "../../../models/IReduxProps";
import {
  UserActionGroup,
} from "../../../models/IUserActionProps";
import { FileReducerEnum } from "./actionTypes";

type FileReducerType = {
  dates: UserActionGroup[];
  selectedUser: UserActionGroup | null;
};

const defaultState: FileReducerType = {
  dates: [],
  selectedUser: null,
};

const fileReducer: Reducer<FileReducerType, AnyAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case FileReducerEnum.SET_DATES:
      return { ...state, dates: action.payload };
    case FileReducerEnum.SELECTED_USER:
      return { ...state, selectedUser: action.payload };
    case FileReducerEnum.SET_USER_ACTION_LIST:
      return { ...state, userActionList: action.payload };
    default:
      return state;
  }
};

export default fileReducer;
