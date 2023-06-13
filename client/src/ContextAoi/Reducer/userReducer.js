const UserReducer = (state, action) => {
  switch (action.type) {
    // --------------- Authanticated
    case "AUTH_SUCCESS":
      return {
        ...state,
        Authanticated: true,
      };
    // ------------- login user
    case "USER_LOGIN_LOAD":
      return {
        ...state,
        loading: true,
        Authanticated: false,
      };
    case "USER_LOGIN_LOAD_FAIL":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        Authanticated: true,
        user: action.payload,
      };
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };

    //   ------------------- load User
    case "USER_LOAD":
      return {
        ...state,
      };
    case "USER_LOAD_FAIL":
      return {
        ...state,
      };
    case "USER_LOAD_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOAD_ERROR":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default UserReducer;
