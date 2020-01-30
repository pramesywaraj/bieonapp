import Api from "../../Services/Api";

const api = new Api();

export default (id, data) => dispatch => {
    
    dispatch({
        type: 'UPDATE_INPUT_SALT_B',
        data,
        payload:null
    })
    
    api.update_input_salt_b(id, data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"UPDATE_INPUT_SALT_B_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"UPDATE_INPUT_SALT_B_ERROR",
                payload:null,
            })
        }
    })
}