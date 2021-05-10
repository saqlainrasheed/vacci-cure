import {
  CHILD_REGISTRATION,
  LOGIN,
  LOGOUT,
  REGISTER,
  REGISTER_HOSPITAL,
} from "./constants";
import initialState from "./store";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: [...state.user, action.payload.user],
        authorized: action.payload.authorized,
      };
    case LOGOUT:
      return {
        user: [],
        authorized: action.payload.authorized,
      };
    case REGISTER:
      return {
        user: [...state.user, action.payload.user],
        authorized: action.payload.authorized,
      };
    case REGISTER_HOSPITAL:
      return {
        user: [...state.user, action.payload.user],
        authorized: action.payload.authorized,
      };
    case CHILD_REGISTRATION:
      return state;
    default:
      return state;
  }
};

export default reducer;
