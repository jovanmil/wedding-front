import axios from "axios";
import {updateResources, updateResourcesWithIds} from "../../redux/actions/populateActions";
import {decrypt} from "../crypting/crypt";

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
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

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
        axios.delete("http://localhost:9005/guests/" + guestId,
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

export function doFetchAllCategories(populateKey, type) {
    const TOKEN = decrypt(window.sessionStorage.getItem("token"));

    return (dispatch) => {
        axios.get("http://localhost:9005/categories",
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
        axios.get("http://localhost:9005/subcategories/" + id,
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
        axios.post("http://localhost:9005/guests/" + categoryId + "/" + subcategory + "/" + userId,
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
        axios.post("http://localhost:9005/categories/" + userId,
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