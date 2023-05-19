import axios from "axios";

export const Signin = async (credentials) => {
    // console.log(`${process.env.VUE_APP_BASE_URL}/user/signin`)
    // http://localhost:8080/ 
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/user/signin`,
    // return await axios.post(`http://localhost:3000/api/user/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
}
