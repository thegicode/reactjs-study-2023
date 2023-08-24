import { useMemo } from "react";
import styles from "../../css/UseMemo.module.css";

interface ItemProps {
    id: string;
    title: string;
    amount: number;
}

interface ReportProps {
    item: ItemProps;
}

const items = [
    { id: "1", title: "title", amount: 1 },
    { id: "2", title: "title", amount: 2 },
];

export default function UseMemo3() {
    return (
        <div className={styles.useMemo3}>
            <h3>loop 안에서 사용시</h3>
            <ul>
                {items.map((item) => (
                    <Report key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}

function Report({ item }: ReportProps) {
    const data = useMemo(() => calculateReport(item), [item]);
    const { id, title, amount } = data;
    return (
        <li>
            {id} {title} {amount}
        </li>
    );
}

function calculateReport({ id, title, amount }: ItemProps) {
    console.log("calculateReport");
    return {
        id,
        title,
        amount: amount * 10,
    };
}

// 또는
// const Report = memo(function Report({ item }) {
//     const data = calculateReport(item);
//     return (
//       <figure>
//         <Chart data={data} />
//       </figure>
//     );
//   });
