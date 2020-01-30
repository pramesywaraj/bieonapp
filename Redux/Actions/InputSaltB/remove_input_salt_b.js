import Api from "../../Services/Api";

const api = new Api();

export default (id) => dispatch => {
    
    dispatch({
        type: 'REMOVE_INPUT_SALT_B',
        data,
        payload:null
    })
    
    api.remove_input_salt_b(id).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"REMOVE_INPUT_SALT_B_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"REMOVE_INPUT_SALT_B_ERROR",
                payload:null,
            })
        }
    })
}