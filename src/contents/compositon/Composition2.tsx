import React, { ChangeEvent, useState } from "react";

interface DataProps {
    id: number;
    count: number;
    title: string;
}

const Data: DataProps[] = [
    { id: 1, count: 1, title: "title" },
    { id: 2, count: 2, title: "title" },
    { id: 3, count: 3, title: "title" },
];

// interface ModalShowType {
//     isModalShow: boolean;
//     setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function App() {
    const [isModalShow, setModalShow] = useState<boolean>(false);
    return (
        <>
            <Parent data={Data} setModalShow={setModalShow} />
            {isModalShow && <Modal />}
        </>
    );
}

interface ParentProps {
    data: DataProps[];
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function Parent({ data, setModalShow }: ParentProps) {
    return (
        <List>
            {data.map((item) => (
                <Item key={item.id} data={item} setModalShow={setModalShow} />
            ))}
        </List>
    );
}

interface ListProps {
    children: React.ReactNode;
}
function List({ children }: ListProps) {
    return <ul>{children}</ul>;
}

interface ItemProps {
    data: DataProps;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function Item({ data, setModalShow }: ItemProps) {
    const { id, count } = data;

    const [amount, setAmount] = useState<number>(count);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const handleClick = () => {
        setModalShow(true);
        // update sslected itemID
        // modal show
    };

    return (
        <li>
            <p>
                [{id}] amount: {amount}
            </p>

            <input
                type="number"
                min="0"
                value={amount}
                onChange={handleChange}
            />
            <button type="button" onClick={handleClick}>
                Open Modal
            </button>
        </li>
    );
}

function Modal() {
    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id : </h4>
                <p>count: </p>
                <input type="number" />

                <button>close</button>
            </div>
        </div>
    );
}
