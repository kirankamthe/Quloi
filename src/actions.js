export const signIn = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_USER",
      payload: credentials,
    });
  };
};

export const addStudent = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_STUD",
      payload: data,
    });
  };
};

export const editStudent = (data) => {
  return (dispatch) => {
    dispatch({
      type: "EDIT_STUD",
      payload: data,
    });
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
