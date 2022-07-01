import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <h1 className="header__title">do|doing|done</h1>
            <nav className="header__nav">
                <ul className="header__list">
                    <li>
                        <a className="header__link" href="">
                            how it works
                        </a>
                    </li>
                    <li>
                        <a className="header__link" href="">
                            logout
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
