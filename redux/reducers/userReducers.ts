import { AnyAction } from "redux";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export interface User {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  role?: string;
}

export interface Auth {
  loading: boolean;
  user: User | null;
}

const initAuth: Auth = {
  loading: false,
  user: null,
};

// auth reducer
export const authReducer = (state: Auth = initAuth, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REGISTER_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
