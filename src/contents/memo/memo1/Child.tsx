import { memo } from "react";
import styles from "../../../css/Memo.module.css";

interface ChildProps {
    title: string;
    amount: string;
}

function Child({ title, amount }: ChildProps) {
    console.log("자식 컴포넌트");

    return (
        <div className={styles.child}>
            <h4>Child Component</h4>
            <p>제목: {title}</p>
            <p>수량: {amount}</p>
        </div>
    );
}

export default memo(Child);
