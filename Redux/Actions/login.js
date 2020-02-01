import { login } from "../../Services/ApiAxios";

export function loginAction(data) {
    return dispatch => {
        dispatch()
        const res = login(data);
    }
}
