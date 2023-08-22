import { Link } from "react-router-dom";
import "../css/navigation.css";

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="depth1">
                <li className="depth1-item">
                    <p className="title">Hooks</p>
                    <nav className="depth2">
                        <Link to="/useeffect">useEffect</Link>
                        <Link to="/usememo">useMemo</Link>
                        <Link to="/usecallback">useCallback</Link>
                        <Link to="/memo">Memo</Link>
                        <Link to="/forwardref">ForwardRef</Link>
                        <Link to="/usecontext">Context</Link>
                        <Link to="/composition">Composition</Link>
                    </nav>
                </li>
                <li className="depth1-item">
                    <p className="title">Practical</p>
                    <nav className="depth2">
                        <Link to="/products">Products</Link>
                    </nav>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
