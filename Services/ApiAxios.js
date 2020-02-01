import axios from 'axios'
import config from 'react-native-config'


// Auth services
export const login = async (data) => {
    try {
        const response = await axios.post(config.API_URL, data);
        console.log(response);

        return response;
    }
    catch(err) {
        console.log("Error detected in Login", err);
        return err;
    }
}