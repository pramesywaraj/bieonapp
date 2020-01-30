let INITIAL_STATE = {
    data:null,
    payload:null,
    fetching:false,
    error:false,
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        data: action.data,
        fetching:true,
    };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        payload: action.payload,
        fetching:false
    };
    case "REGISTER_ERROR":
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