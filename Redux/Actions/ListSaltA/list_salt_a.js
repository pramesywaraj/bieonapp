import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'LIST_SALT_A',
        data,
        payload:null
    })
    
    api.list_salt_a(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"LIST_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"LIST_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}