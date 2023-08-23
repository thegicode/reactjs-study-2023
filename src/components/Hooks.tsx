import { Link } from "react-router-dom";

export default function Hooks() {
    return (
        <>
            <Link to="/useeffect">useEffect</Link>
            <Link to="/usememo">useMemo</Link>
            <Link to="/usecallback">useCallback</Link>
            <Link to="/memo">Memo</Link>
            <Link to="/forwardref">ForwardRef</Link>
            <Link to="/usecontext">Context</Link>
            <Link to="/composition">Composition</Link>
        </>
    );
}
