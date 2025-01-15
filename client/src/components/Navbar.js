import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Home page</h1>
                </Link>
                <Link to="/other-page">
                    <h1>Other page</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar