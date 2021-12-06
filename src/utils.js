import { toast } from "react-toastify";

export const alert = (message) => {
   toast(message, {
      className: "toast",
      progressClassName: "toast-progress",
      autoClose: 3000,
   });
};
