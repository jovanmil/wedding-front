import {fromJS, Map} from "immutable";
import {
  POPULATE_KEY_FETCH_GUESTS,
  TYPE_ADD_CATEGORY,
  TYPE_ADD_GUEST,
  TYPE_DELETE_GUEST,
  TYPE_FETCH_CATEGORIES,
  TYPE_FETCH_GUESTS,
  TYPE_FETCH_SUBCATEGORIES
} from "../actions/constants";

const datareducer = (im_state = new Map(), action = {}) => {
  const populateKey = action.populateKey;

  switch (action.type) {
    case TYPE_FETCH_GUESTS: {
      const response = fromJS(action.payload);

      if (response !== "error") {
        im_state = im_state.setIn([populateKey], response.get("data"));
      }
      else {
        im_state = im_state.setIn([populateKey], response);
      }

      return im_state;
    }

    case TYPE_DELETE_GUEST: {
      const guestId = fromJS(action.id);
      const usersList = im_state.get(POPULATE_KEY_FETCH_GUESTS);

      usersList && usersList.forEach((guest, index) => {
        if (guest.get("id") === guestId) {
          im_state = im_state.deleteIn([POPULATE_KEY_FETCH_GUESTS, index])
        }
      });
      return im_state;
    }

    case TYPE_FETCH_CATEGORIES: {
      const response = fromJS(action.payload);

      if (response !== "error" && response.size !== 0) {
        im_state = im_state.setIn([populateKey], response.get("data"));
      }
      else {
        im_state = im_state.setIn([populateKey], response);
      }

      return im_state;
    }

    case TYPE_FETCH_SUBCATEGORIES: {
      const response = fromJS(action.payload);

      if (response !== "error") {
        im_state = im_state.setIn([populateKey], response.get("data"));
      }
      else {
        im_state = im_state.setIn([populateKey], response);
      }

      return im_state;
    }

    case TYPE_ADD_GUEST: {
      const response = fromJS(action.payload);

      im_state = im_state.setIn([populateKey], response);
      return im_state;
    }

    case TYPE_ADD_CATEGORY: {
      const response = fromJS(action.payload);

      im_state = im_state.setIn([populateKey], response);
      return im_state;
    }

    default:
      return im_state;

  }
};

export default datareducer;