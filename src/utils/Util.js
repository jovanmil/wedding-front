import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function popUp(title, message, onYes, okButton) {

  const buttons = [];
  if (!okButton) {
    buttons.push({
          label: "Yes",
          onClick: onYes
        },
        {
          label: "No",
          onClick: null
        });
  }
  else{
    buttons.push(
        {
          label: "OK",
          onClick: onYes
        }
    )
  }

  confirmAlert({
    title: title,
    message: message,
    buttons: buttons
  });
};