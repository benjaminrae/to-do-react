import "./ToastNotification.css";
import { useState, useEffect } from "react";

const ToastNotification = (props) => {
    const { toastList } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    return (
        <div className="toast-notification__window" id="toast-notification">
            {list &&
                list.map((notification, index) => {
                    return (
                        notification.message && (
                            <div
                                key={index}
                                className="toast-notification__container"
                            >
                                <p className="toast-notification__message">
                                    {notification.message}
                                </p>
                                <button
                                    id={notification.id}
                                    onClick={props.onCancel}
                                    className="toast-notification__cancel"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        )
                    );
                })}
        </div>
    );
};

export default ToastNotification;
