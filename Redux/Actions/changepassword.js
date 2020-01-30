import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'CHANGE_PASSWORD',
        data,
        payload:null
    })
    
    api.changepassword(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"CHANGE_PASSWORD_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"CHANGE_PASSWORD_ERROR",
                payload:null,
            })
        }
    })
}