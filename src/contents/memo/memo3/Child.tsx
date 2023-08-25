import { memo } from "react";
import styles from "../../../css/Memo.module.css";

interface ChildProps {
    title: string;
    passFn: () => void;
}

function Child({ title, passFn }: ChildProps) {
    console.log("자식 컴포넌트");

    return (
        <div className={styles.child}>
            <h4>Child Component</h4>
            <p>제목: {title}</p>
            <button onClick={passFn}>부모 메서드 실행</button>
        </div>
    );
}

export default memo(Child);
