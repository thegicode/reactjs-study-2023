import CustomHook1 from "../contents/customHooks/CustomHook1";
import CustomHook2 from "../contents/customHooks/CustomHook2";
import styles from "../css/CustomHooksPage.module.css";

export default function CustomHooksPage() {
    return (
        <section className={styles.customHooksPage}>
            <h1>Custom Hooks</h1>
            <ul>
                <li></li>
            </ul>

            {/* <h2>1. useInput</h2> */}
            <CustomHook1 />

            {/* <h2>2. useFetch</h2> */}
            <CustomHook2 />
        </section>
    );
}
