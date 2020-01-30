import Api from "../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'REGISTER',
        data,
        payload:null
    })
    
    api.register(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"REGISTER_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"REGISTER_ERROR",
                payload:null,
            })
        }
    })
}