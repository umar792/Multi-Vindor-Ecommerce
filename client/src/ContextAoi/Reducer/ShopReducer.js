const ShopReducer = (state, action) => {
  switch (action.type) {
    // --------------- Authanticated
    case "AUTH_SUCCESS_Shop":
      return {
        ...state,
        ShopAuthanticated: true,
      };
    // --------------------------- shop Login
    case "SHOP_OWNEER_LOGIN_LOAD":
      return {
        ...state,
        shopLoading: true,
        ShopAuthanticated: false,
      };
    case "SHOP_OWNEER_LOGIN_LOAD_FETCH_ERROR":
      return {
        ...state,
        shopLoading: false,
        ShopAuthanticated: false,
      };
    case "SHOP_OWNER_LOGIN_SUCCESS":
      return {
        ...state,
        shopLoading: false,
        ShopAuthanticated: true,
        ShopOwner: action.payload,
      };

    case "SHOP_OWNER_LOGIN_ERROR":
      return {
        ...state,
        shopLoading: false,
        ShopAuthanticated: false,
        ERROR: action.payload,
      };

    // ------------------------ Get Owner

    case "SHOP_OWNEER_GET_LOAD":
      return {
        ...state,
      };
    case "SHOP_OWNEER_GET_LOAD_FETCH_ERROR":
      return {
        ...state,
      };
    case "SHOP_OWNER_GET_SUCCESS":
      return {
        ...state,
        ShopOwner: action.payload,
      };
    case "SHOP_OWNER_GET_ERROR":
      return {
        ...state,
        ERROR: action.payload,
      };

    default:
      return state;
  }
};
export default ShopReducer;
