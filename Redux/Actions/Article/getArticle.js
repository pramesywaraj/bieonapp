import Api from "../../Services/Api";

const api = new Api();

export default (id, data) => dispatch => {
    
    dispatch({
        type: 'getArticle',
        data,
        payload:null
    })
    
    api.getArticle(id, data).then((response)=>{
        
        if(typeof response.data !== 'undefined'){
            dispatch({
                type:"UPDATE_INPUT_SALT_A_SUCCESS",
                payload: response
            })
        }else{
            dispatch({
                type:"UPDATE_INPUT_SALT_A_ERROR",
                payload:null,
            })
        }
    })
}