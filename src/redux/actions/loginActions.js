import axios from "axios";
import {updateResources} from "../../redux/actions/populateActions";

export function doLogin(result, populateKey, type) {

    const userName = result.email;
    const password = result.password;

    return (dispatch) => {

        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjM2MTQ2MTMsInVzZXJfbmFtZSI6ImpvdmFuLm1pbHV0aW5vdmljODRAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TWVNURU1BRE1JTiJdLCJqdGkiOiIwYzg1NzQ2NS1hNDQzLTQxNDItYjU0OC1jODUzM2I5OTZmMjEiLCJjbGllbnRfaWQiOiJ0dXRvcmlhbHNwb2ludCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdfQ.cRCf_snG7A_l7WvnY98mcRRMFCd_RBcnQwxvoBM9YTy0kt9UZHfda1TZIO27VrK0VT8htd_GrOeUj2jxLGxNEvvAFhQT-3RFbnNjQRWVq-g0ymDc43YGlGtTVvv2-VQWINa1GZZEp17j70Aiy1T0j9TCObnua_VJq6KbabjmmiAMz2AaxOTossro64IxBlnuN3z9ayTd3Q5osbeKW70Xz9crCQI5RASSds07eD_DT6y-2hfLTgQM15GqAkOQOlHOQh71B3OI6b1gAGwDWUVtT_JKd_GMM7-HvkPEq7unMqz6HmDcIq_FUM9sTkbK_CeT1DpDLzPNjGSOU_VmLLEPPA";

        axios.post('http://localhost:9005/oauth/token', {
                "grant_type": "password",
                "username": userName,
                "password": password,
                "client_id": "tutorialspoint",
                "client_secret": "my-secret-key"
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}