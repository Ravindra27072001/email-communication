import axios from "axios";
// http://localhost:8000/api/user

// export const ResendOTPVerification = async (credentials) => {
//     // console.log(credentials)
//     return await axios.post(`http://localhost:3000/verification/resendOTPVerification`,
//         credentials,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     );
// }

export const ResendOTPVerification = async (credentials) => {
    // console.log(credentials)
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/verification/resendOTPVerification`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

