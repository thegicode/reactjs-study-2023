import CustomHook1 from "../contents/customHooks/CustomHook1";
import styles from "../css/CustomHooksPage.module.css";

export default function CustomHooksPage() {
    return (
        <section className={styles.customHooksPage}>
            <h1>Custom Hooks</h1>
            <ul>
                <li></li>
            </ul>
            <CustomHook1 />
        </section>
    );
}
