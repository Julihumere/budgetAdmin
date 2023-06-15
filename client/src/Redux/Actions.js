import axios from "axios";
export const GET_USER = "GET_USER";
export const GET_ALL_INCOMS = "GET_ALL_INCOMS";
export const GET_INCOM = "GET_INCOM";
export const GET_EXPENSE = "GET_EXPENSE";
export const GET_BALANCE = "GET_BALANCE";
export const POST_USER = "POST_USER";
export const POST_INCOM = "POST_INCOM";
export const POST_EXPENSE = "POST_EXPENSE";
export const PUT_UPDATE_INCOM = "PUT_UPDATE_INCOM";
export const PUT_UPDATE_EXPENSE = "PUT_UPDATE_EXPENSE";
export const DELETE = "DELETE";
export const ACCESS = "ACCESS";
export const DENIED = "DENIED";
export const LOGOUT = "LOGOUT";

// const URL = `${process.env.REACT_APP_URL}`;
const URL = "https://budgetadmin-o5dk.onrender.com";

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
    console.log("getUser", "ERROR");
  }
};

//Post Users
export const postUsers = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const response = await axios({
      method: "post",
      url: `${URL}/user/creationUser`,
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("postUser", error);
  }
};

// Incom
export const getIncom = (id) => (dispatch) => {
  try {
    axios({
      method: "get",
      url: `${URL}/incom/${id}`,
    }).then((res) => {
      dispatch({
        type: GET_INCOM,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log("ERROR");
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
    console.log("addIncom", "ERROR");
  }
};

//Edit Incom
export const editIncom = (payload) => () => {
  console.log(editIncom);
  try {
    axios({
      method: "put",
      url: `${URL}/incom/updateIncom/${payload.id}`,
      data: {
        id: payload.id,
        concept: payload.concept,
        amount: payload.amount,
        category: payload.category,
      },
    });
  } catch (error) {
    console.log("editIncom", "ERROR");
  }
};

//Delete Incom
export const deleteIncom = (payload) => (dispatch) => {
  try {
    axios({
      method: "delete",
      url: `${URL}/incom/deleteIncom/${payload}`,
      data: {
        id: payload,
      },
    });
  } catch (error) {
    console.log("deleteIncom", "ERROR");
  }
};

// Expense
export const getExpense = (id) => (dispatch) => {
  try {
    axios({
      method: "get",
      url: `${URL}/expense/${id}`,
    }).then((res) => {
      dispatch({
        type: GET_EXPENSE,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log("ERROR");
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
    console.log("addExpense", "ERROR");
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
    console.log("editExpense", "ERROR");
  }
};

//Delete Expense
export const deleteExpense = (payload) => () => {
  console.log(payload);
  try {
    axios({
      method: "delete",
      url: `${URL}/expense/deleteExpense`,
      data: {
        id: payload,
      },
    });
  } catch (error) {
    console.log("deleteExpense", "ERROR");
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
    console.log("ERROR");
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
    console.log("ERROR");
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
    console.log("ERROR");
  }
};
