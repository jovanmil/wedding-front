import {fromJS, Map} from "immutable";
import {TYPE_LOG_IN} from "../actions/constants";
import {encrypt} from "../crypting/crypt";

const loginreducer = (state = new Map(), action = {}) => {
    const populateKey = action.populateKey;

    switch (action.type) {
        case TYPE_LOG_IN: {
            const response = fromJS(action.payload);
            if (response !== "error") {
                const token = response.get("data").get("access_token");
                state = state.setIn([populateKey], token);
                const ecryptedToken = encrypt(token);
                sessionStorage.setItem("token", ecryptedToken);
            } else {
                state = state.setIn([populateKey], response);
            }

            return state;
        }

        default:
            return state;

    }
};

export default loginreducer;