import { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "../css/Layout.module.css";

interface LayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navigation}>
                    <Link to="/hooks">Hooks</Link>
                    <Link to="/practical">Practical</Link>
                </nav>
            </header>
            <div className={styles.container}>{children}</div>
        </>
    );
}
