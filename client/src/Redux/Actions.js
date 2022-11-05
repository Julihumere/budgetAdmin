import axios from "axios";
export const GET_USER = "GET_USER";
export const GET_INCOMS = "GET_INCOMS";
export const GET_EXPENSES = "GET_EXPENSES";
export const GET_BALANCE = "GET_BALANCE";
export const POST_USER = "POST_USER";
export const POST_INCOM = "POST_INCOM";
export const POST_EXPENSE = "POST_EXPENSE";
export const PUT_UPDATE_INCOM = "PUT_UPDATE_INCOM";
export const PUT_UPDATE_EXPENSE = "PUT_UPDATE_EXPENSE";
export const DELETE_INCOMS = "DELETE_INCOMS";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const ACCESS = "ACCESS";
export const DENIED = "DENIED";
export const LOGOUT = "LOGOUT";

const URL = "http://localhost:3001";

//Get user
export const getUser = (email) => (dispatch) => {
  try {
    axios({
      method: "get",
      url: `${URL}/user/${email}`,
    }).then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log("getUser", error);
  }
};

//Post Users
export const postUsers = (payload) => (dispatch) => {
  try {
    axios({
      method: "post",
      url: `${URL}/user/creationUser`,
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      },
    });
  } catch (error) {
    console.log("postUser", error);
  }
};

// Add Incom
export const addIncom = (payload) => () => {
  try {
    axios({
      method: "post",
      url: `${URL}/incom/creationIncom`,
      data: {
        concept: payload.concept,
        amount: payload.amount,
        category: payload.category,
        email: payload.email,
        date: payload.date,
      },
    });
  } catch (error) {
    console.log("addIncom", error);
  }
};

//Edit Incom
export const editIncom = (payload) => () => {
  try {
    axios({
      method: "put",
      url: `${URL}/incom/updateIncom`,
      data: {
        id: payload.id,
        concept: payload.concept,
        amount: payload.amount,
        category: payload.category,
      },
    });
  } catch (error) {
    console.log("editIncom", error);
  }
};

//Delete Incom
export const deleteIncom = (payload) => () => {
  try {
    axios({
      method: "delete",
      url: `${URL}/incom/deleteIncom`,
      data: {
        id: payload,
      },
    });
  } catch (error) {
    console.log("deleteIncom", error);
  }
};

// Add Expense
export const addExpense = (payload) => () => {
  try {
    axios({
      method: "post",
      url: `${URL}/expense/creationExpense`,
      data: {
        concept: payload.concept,
        amount: payload.amount,
        category: payload.category,
        email: payload.email,
        date: payload.date,
      },
    });
  } catch (error) {
    console.log("addExpense", error);
  }
};

//Edit Expense
export const editExpense = (payload) => () => {
  try {
    axios({
      method: "put",
      url: `${URL}/expense/updateExpense`,
      data: {
        id: payload.id,
        concept: payload.concept,
        amount: payload.amount,
        category: payload.category,
      },
    });
  } catch (error) {
    console.log("editExpense", error);
  }
};

//Delete Expense
export const deleteExpense = (payload) => () => {
  try {
    axios({
      method: "delete",
      url: `${URL}/expense/deleteExpense`,
      data: {
        id: payload,
      },
    });
  } catch (error) {
    console.log("deleteExpense", error);
  }
};

//Auth
export const auth = (payload) => (dispatch) => {
  try {
    axios({
      method: "post",
      url: `${URL}/user/auth`,
      data: {
        email: payload.email,
        password: payload.password,
      },
    })
      .then((res) => {
        if (res.data === "User has started session") {
          dispatch({
            type: ACCESS,
            payload: res.data,
          });
        }
        if (res.data === "Password incorrect") {
          dispatch({
            type: DENIED,
            payload: res.data,
          });
        }
        if (res.data === "User not found") {
          dispatch({
            type: DENIED,
            payload: res.data,
          });
        }
      })
      .then(() => {
        dispatch({
          type: LOGOUT,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

//Login
export const logIn = (payload) => () => {
  try {
    axios({
      method: "put",
      url: `${URL}/user/login`,
      data: {
        email: payload.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//Logout
export const logOut = (payload) => (dispatch) => {
  try {
    axios({
      method: "put",
      url: `${URL}/user/logout`,
      data: {
        email: payload,
      },
    }).then(() => {
      dispatch({
        type: LOGOUT,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
