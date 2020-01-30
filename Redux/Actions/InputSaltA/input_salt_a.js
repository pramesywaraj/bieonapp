import Api from "../../Services/Api";

const api = new Api();

export default (data) => dispatch => {
    
    dispatch({
        type: 'INPUT_SALT_A',
        data,
        payload:null
    })
    
    api.input_salt_a(data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"INPUT_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"INPUT_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}