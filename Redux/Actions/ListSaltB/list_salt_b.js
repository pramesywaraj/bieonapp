import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'LIST_SALT_B',
        data,
        payload:null
    })
    
    api.list_salt_b(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"LIST_SALT_B_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"LIST_SALT_B_ERROR",
                payload:null,
            })
        }
    })
}