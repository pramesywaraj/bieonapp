let INITIAL_STATE = {
    data:null,
    payload:null,
    fetching:false,
    error:false,
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD":
      return {
        ...state,
        data: action.data,
        fetching:true,
    };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        payload: action.payload,
        fetching:false
    };
    case "CHANGE_PASSWORD_ERROR":
      return {   
        data:null,
        error: true,
        fetching:false,
        payload:null
    };
    default:
      return state;
  }
};