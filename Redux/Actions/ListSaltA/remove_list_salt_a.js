import Api from "../../Services/Api";

const api = new Api();

export default (id) => dispatch => {
    
    dispatch({
        type: 'REMOVE_LIST_SALT_A',
        data,
        payload:null
    })
    
    api.remove_list_salt_a(id).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"REMOVE_LIST_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"REMOVE_LIST_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}