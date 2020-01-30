import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'ADD_INPUT_SALT_B',
        data,
        payload:null
    })
    
    api.add_input_salt_b(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"ADD_INPUT_SALT_B_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"ADD_INPUT_SALT_B_ERROR",
                payload:null,
            })
        }
    })
}