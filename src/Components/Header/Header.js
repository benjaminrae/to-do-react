import "./Header.css";
// import { useState, useEffect } from "react";

const Header = (props) => {
    // const [loginDetails, setLoginDetails] = useState({});

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     setLoginDetails(props.onLogin());
    // };
    return (
        <div className="header">
            <h1 className="header__title">do | doing | done</h1>
            <nav className="header__nav">
                {/* <ul className="header__list">
                    <li>
                        <p>logged in as </p>
                    </li>
                    <li>
                        <a className="header__link" href="">
                            how it works
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={handleLogin}
                            className="header__login"
                            href=""
                        >
                            login
                        </button>
                    </li>
                </ul> */}
            </nav>
        </div>
    );
};

export default Header;
