import axios from "axios";
import {updateResources} from "../../redux/actions/populateActions";
import {decrypt} from "../crypting/crypt";

const TOKEN = decrypt(window.sessionStorage.getItem("token"));

export function doLogin(form, populateKey, type) {
    const userName = form.email;
    const password = form.password;

    return (dispatch) => {
        axios.post('http://localhost:9005/oauth/token', {
                "grant_type": "password",
                "username": userName,
                "password": password,
                "client_id": "tutorialspoint",
                "client_secret": "my-secret-key"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}

export function doFetchAllGuests(populateKey, type) {
    return (dispatch) => {
        axios.get("http://localhost:9005/guests",
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                console.log(error.response.status);
            });
    }
}