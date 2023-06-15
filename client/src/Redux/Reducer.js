import {
  GET_BALANCE,
  GET_INCOM,
  GET_EXPENSE,
  GET_USER,
  ACCESS,
  DENIED,
  LOGOUT,
  GET_ALL_INCOMS,
  DELETE,
} from "./Actions.js";

const initialState = {
  user: [],
  balance: [],
  incoms: [],
  incom: [],
  expense: [],
  msg: "",
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      console.log("reducer", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }
    case GET_BALANCE: {
      return {
        ...state,
        balance: action.payload,
      };
    }
    case GET_INCOM: {
      console.log(action.payload);
      return {
        ...state,
        incom: action.payload,
      };
    }
    case GET_EXPENSE: {
      return {
        ...state,
        expense: action.payload,
      };
    }

    case ACCESS: {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case DENIED: {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        msg: "",
      };
    }
    default:
      return { ...state };
  }
}
