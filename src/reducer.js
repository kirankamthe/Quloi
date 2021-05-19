const initialState = {
  students: [],
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_STUD":
      return {
        ...state,
        students: [action.payload, ...state.students],
      };
    case "EDIT_STUD":
      return {
        ...state,
        students: [
          action.payload,
          ...state.students.filter((item) => item._id !== action.payload._id),
        ],
      };
    case "GET_STUD":
      return {
        ...state,
        students: action.payload,
      };
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
