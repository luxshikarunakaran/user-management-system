import {
  ToastContainer as RTToastContainer,
  toast as rtToast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainer = (props) => (
  <RTToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    {...props}
  />
);

export const toast = rtToast;

export default ToastContainer;
