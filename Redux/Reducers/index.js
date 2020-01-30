import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
//input_salt_a
import input_salt_a from "./InputSaltA/input_salt_a";
import add_input_salt_a from "./InputSaltA/add_input_salt_a";
import update_input_salt_a from "./InputSaltA/update_input_salt_a";
import remove_input_salt_a from "./InputSaltA/remove_input_salt_a";
//input_salt_b
import input_salt_b from "./InputSaltB/input_salt_b";
import add_input_salt_b from "./InputSaltB/add_input_salt_b";
import update_input_salt_b from "./InputSaltB/update_input_salt_b";
import remove_input_salt_b from "./InputSaltB/remove_input_salt_b";
//list_salt_a
import list_salt_a from "./ListSaltA/list_salt_a";
import add_list_salt_a from "./ListSaltA/add_list_salt_a";
import update_list_salt_a from "./ListSaltA/update_list_salt_a";
import remove_list_salt_a from "./ListSaltA/remove_list_salt_a";
//list_salt_a
import list_salt_b from "./ListSaltB/list_salt_b";
import add_list_salt_b from "./ListSaltB/add_list_salt_b";
import update_list_salt_b from "./ListSaltB/update_list_salt_b";
import remove_list_salt_b from "./ListSaltB/remove_list_salt_b";


export default combineReducers({
    login,
    register,
    input_salt_a,
    add_input_salt_a,
    update_input_salt_a,
    remove_input_salt_a,
    input_salt_b,
    add_input_salt_b,
    update_input_salt_b,
    remove_input_salt_b,
    list_salt_a,
    add_list_salt_a,
    update_list_salt_a,
    remove_list_salt_a,
    list_salt_b,
    add_list_salt_b,
    update_list_salt_b,
    remove_list_salt_b,
});