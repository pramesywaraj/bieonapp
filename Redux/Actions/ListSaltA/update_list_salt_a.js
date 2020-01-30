import Api from "../../Services/Api";

const api = new Api();

export default (id, data) => dispatch => {
    
    dispatch({
        type: 'UPDATE_LIST_SALT_A',
        data,
        payload:null
    })
    
    api.update_list_salt_a(id, data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"UPDATE_LIST_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"UPDATE_LIST_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}