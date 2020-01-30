import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'ADD_LIST_SALT_A',
        data,
        payload:null
    })
    
    api.add_list_salt_a(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"ADD_LIST_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"ADD_LIST_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}