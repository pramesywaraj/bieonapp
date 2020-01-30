import Api from "../../Services/Api";
const api = new Api();
export default (data) => dispatch => {
    
    dispatch({
        type: 'LOGIN',
        data,
        payload:null
    })
    
    
    api.login(data).then((response)=>{
        console.log("response2",response);
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"LOGIN_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"LOGIN_ERROR",
                payload:null,
            })
        }
    })
}