import Api from "../../Services/Api";

const api = new Api();

export default (id) => dispatch => {
    
    dispatch({
        type: 'REMOVE_LIST_SALT_B',
        data,
        payload:null
    })
    
    api.remove_list_salt_b(id).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"REMOVE_LIST_SALT_B_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"REMOVE_LIST_SALT_B_ERROR",
                payload:null,
            })
        }
    })
}