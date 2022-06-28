import "./ToastNotification.css";

const ToastNotification = (props) => {
    return (
        <div className="toast-notification__window" id="toast-notification">
            <div className="toast-notification__container">
                <p className="toast-notification__message">{props.message}</p>
            </div>
        </div>
    );
};

export default ToastNotification;
