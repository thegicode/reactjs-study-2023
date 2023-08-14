import { Link } from "react-router-dom";
import "../css/navigation.css";

function Navigation() {
    return (
        <nav className="navigation">
            <ul>
                {/* <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li> */}
                <li>
                    <Link to="/forwardref">ForwardRef</Link>
                </li>
                <li>
                    <Link to="/memo">Memo</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
