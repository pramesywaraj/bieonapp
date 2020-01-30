import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'ADD_INPUT_SALT_A',
        data,
        payload:null
    })
    
    api.add_input_salt_a(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"ADD_INPUT_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"ADD_INPUT_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}