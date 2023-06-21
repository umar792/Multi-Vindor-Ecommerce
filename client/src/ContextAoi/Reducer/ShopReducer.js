const ShopReducer = (state, action) => {
  switch (action.type) {
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
        ShopAuthenticatd: true,
        ShopOwner: action.payload,
      };
    case "SHOP_OWNER_LOGIN_ERROR":
      return {
        ...state,
        shopLoading: false,
        ERROR: action.payload,
      };

    default:
      return state;
  }
};
export default ShopReducer;
