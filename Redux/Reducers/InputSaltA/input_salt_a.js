let INITIAL_STATE = {
    data:null,
    payload:null,
    fetching:false,
    error:false,
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INPUT_SALT_A":
      return {
        ...state,
        data: action.data,
        fetching:true,
    };
    case "INPUT_SALT_A_SUCCESS":
      return {
        ...state,
        payload: action.payload,
        fetching:false
    };
    case "INPUT_SALT_A_ERROR":
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