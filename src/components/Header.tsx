import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="header">
            <Link to="/">Hooks</Link>
            <Link to="/practical">Practical</Link>

            {/* <ul className="depth1">
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
            </ul> */}
        </nav>
    );
}
