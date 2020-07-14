import userTypes from "./userTypes";

const initialState = {
  currentUser: null,
  error: [],
  isReset: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: [],
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        ...initialState
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isReset: true,
      };
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};


export default userReducer;
