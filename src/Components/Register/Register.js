import "./Register.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleGoogleClick = (event) => {
        event.preventDefault();
        loginWithGoogle();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            registerWithEmailAndPassword(email, password).then((result) =>
                navigate("/")
            );
        }
    };
    return (
        // needs a way to navigate back to log in
        <div className="register__window" id="register__window">
            <form className="register__form">
                <label
                    htmlFor="register__email"
                    className="register__email-label"
                >
                    email
                </label>
                <input
                    id="register__email"
                    className="register__email"
                    onChange={handleEmailChange}
                    type="email"
                ></input>
                <label
                    htmlFor="register__password"
                    className="register__password-label"
                >
                    password
                </label>
                <input
                    id="register__password"
                    className="register__password"
                    onChange={handlePasswordChange}
                    type="password"
                ></input>
                <label
                    htmlFor="register__confirm-password"
                    className="register__confirm-password-label"
                >
                    confirm password
                </label>
                <input
                    id="register__confirm-password"
                    className="register__confirm-password"
                    onChange={handleConfirmPasswordChange}
                    type="password"
                ></input>
                <button className="register__submit" onClick={handleSubmit}>
                    register
                </button>
                <button
                    className="register__submit"
                    onClick={handleGoogleClick}
                >
                    login with Google
                </button>
                <div>
                    already have one? <Link to="/">login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
