export const TYPE_LOG_IN = "TYPE_LOG_IN";

export function doLogin(result, populateKey, type) {

    // web.token =  getToken();
    //
    // return (dispatch) => {
    //
    //     const token = {token:  window.sessionStorage.getItem("token")};
    //
    //     web.auth.test(token)
    //         .then((result) => {
    //
    //             dispatch(updateResources(result, KEY_USER_AUTHENTIFICATION, TYPE_USER_AUTHENTIFICATION));
    //
    //         })
    //         .catch(function (err) {
    //             if(err){
    //                 const res = {"ok":false};
    //                 dispatch(updateResources(res, KEY_USER_AUTHENTIFICATION, TYPE_USER_AUTHENTIFICATION));
    //             }
    //         })
    // }
    return {
        type: type,
        payload: result,
        populateKey: populateKey
    };
}