import axios from "axios";
import {updateResources, updateResourcesWithIds} from "../../redux/actions/populateActions";
import {decrypt} from "../crypting/crypt";
import {POPULATE_KEY_USER_DETAILS, TYPE_USER_DETAILS} from "./constants";

// const serverPrefix = "http://localhost:9005";

const serverPrefix = "http://svadba.jvmhost.net:9005";

export function doLogin(form, populateKey, type) {
    const userName = form.email;
    const password = form.password;

    return (dispatch) => {
        axios.post(serverPrefix + '/oauth/token', {
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
                doFetchUserDetails(dispatch, userName, POPULATE_KEY_USER_DETAILS, TYPE_USER_DETAILS);
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}

export function doFetchUserDetails(dispatch, userEmail, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    axios.get(serverPrefix + "/users/details/" + userEmail,
        {
            headers: {
                "Authorization": "Bearer " + TOKEN
            }
        }
    )
        .then(response => {
            dispatch(updateResources(response, populateKey, type));
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error.response.status);
        });

}

export function doFetchAllGuests(userId, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.get(serverPrefix + "/guests/" + userId,
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.status);
            });
    }
}

export function doDeleteSingleGuest(guestId, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.delete(serverPrefix + "/guests/" + guestId,
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            }
        )
            .then(response => {
                dispatch(updateResourcesWithIds(response, populateKey, type, guestId));
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function doFetchAllCategories(userId, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.get(serverPrefix + "/categories/" + userId,
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.status);
                dispatch(updateResources("error", populateKey, type));
            });
    }
}

export function doFetchAllSubCategoriesByCategoryId(id, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.get(serverPrefix + "/subcategories/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            }
        )
            .then(response => {
                dispatch(updateResources(response, populateKey, type));
                // console.log(response.data);
            })
            .catch(error => {
                // console.log(error.response.status);
                dispatch(updateResources("error", populateKey, type));
            });
    }
}

export function doPostGuest(
    firstName,
    lastName,
    description,
    invited,
    confirmed,
    categoryId,
    subcategory,
    userId,
    populateKey,
    type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.post(serverPrefix + "/guests/" + categoryId + "/" + subcategory + "/" + userId,
            {
                "firstName": firstName,
                "lastName": lastName,
                "description": description,
                "invited": invited,
                "confirmed": confirmed
            },
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN,
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                dispatch(updateResources("success", populateKey, type));
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}

export function doPostCategory(categoryName, userId, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.post(serverPrefix + "/categories/" + userId,
            {
                "name": categoryName
            },
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN,
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                dispatch(updateResources("success", populateKey, type));
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}

export function doPostSubCategoryByCategoryId(subCategoryName, categoryId, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.post(serverPrefix + "/subcategories/" + categoryId,
            {
                "name": subCategoryName
            },
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN,
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                dispatch(updateResources("success", populateKey, type));
            })
            .catch(error => {
                console.log(error);
                dispatch(updateResources("error", populateKey, type));
                // console.log(error.response.status);
            });
    }
}

export function doUpdateGuest(guestId, firstName, lastName, description, invited, confirmed, categoryId, subcategoryId, tableNo, populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.put(serverPrefix + "/guests/" + guestId + "/" + categoryId + "/" + subcategoryId,
            {
                "firstName": firstName,
                "lastName": lastName,
                "description": description,
                "invited": invited,
                "confirmed": confirmed,
                "tableNo": tableNo
            },
            {
                headers: {
                    "Authorization": "Bearer " + TOKEN,
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