import UseEffect1 from "../contents/useEffect/UseEffect1";
import UseEffect2 from "../contents/useEffect/UseEffect2";
import styles from "../css/UseEffectPage.module.css";

export default function UseEffectPage() {
    return (
        <section className={styles.useEffectPage}>
            <h1>useEffect Page</h1>
            <p>
                Mount(화면 첫 렌더링), Update(다시 렌더링), Unmont(화면에서
                사라질 때) 특정 작업을 처리할 코드를 실행시키고 싶을 때
            </p>

            <h2>예제 1. Mount, Update</h2>
            <UseEffect1 />

            <h2>예제 2. Cleanup</h2>
            <UseEffect2 />
        </section>
    );
}
