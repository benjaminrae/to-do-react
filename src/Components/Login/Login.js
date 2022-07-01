import "./Login.css";

const Login = () => {
    return (
        <div className="login__window" id="login__window">
            <form className="login__form">
                <button className="login__cancel">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <label htmlFor="login__username">username</label>
                <input id="login__username" className="login__username"></input>
                <label htmlFor="login__password">password </label>
                <input id="login__password" className="login__password"></input>
                <button className="login__submit">login</button>

                <button className="login__submit">create an account</button>
            </form>
        </div>
    );
};

export default Login;
