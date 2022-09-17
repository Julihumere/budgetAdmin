import { GET_BALANCE, GET_INCOMS, GET_EXPENSES, GET_USER } from "./Actions.js";

const initialState = {
  user: [],
  balance: [],
  incoms: [],
  expenses: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
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
    case GET_INCOMS: {
      return {
        ...state,
        incoms: action.payload,
      };
    }
    case GET_EXPENSES: {
      return {
        ...state,
        expenses: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
