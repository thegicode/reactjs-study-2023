import { ReactNode } from "react";
import { Link } from "react-router-dom";

import "../css/layout.css";

interface LayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className="header">
                <nav className="navigation">
                    <Link to="/hooks">Hooks</Link>
                    <Link to="/practical">Practical</Link>
                </nav>
            </header>
            <div className="container">{children}</div>
        </>
    );
}
