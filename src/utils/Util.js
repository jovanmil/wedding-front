import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function popUp (title, message, onYes) {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: onYes
      },
      {
        label: "No",
        onClick: null
      }
    ]
  });
};