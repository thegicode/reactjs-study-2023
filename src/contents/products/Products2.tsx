// props drilling

import React, { useState, useCallback } from "react";

interface DataProps {
    id: number;
    title: string;
    amount: number;
}

const Data: DataProps[] = [
    { id: 1, title: "title", amount: 1 },
    { id: 2, title: "title", amount: 2 },
    { id: 3, title: "title", amount: 3 },
];

export default function App() {
    const [modalInfo, setModalInfo] = useState<{
        id: number;
        title: string;
        amount: number;
        onAmountChange: (newAmount: number) => void;
    } | null>(null);

    const handleItemClick = useCallback(
        (
            id: number,
            title: string,
            amount: number,
            onAmountChange: (newAmount: number) => void
        ) => {
            setModalInfo({ id, title, amount, onAmountChange });
        },
        []
    );

    const closeModal = useCallback(() => {
        setModalInfo(null);
    }, []);

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            {modalInfo && (
                <Modal
                    id={modalInfo.id}
                    title={modalInfo.title}
                    amount={modalInfo.amount}
                    onAmountChange={modalInfo.onAmountChange}
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Parent({ data, onItemClicked }: ParentProps) {
    return (
        <ul>
            {data.map((item, index) => (
                <Item key={index} data={item} onItemClicked={onItemClicked} />
            ))}
        </ul>
    );
}

interface ItemProps {
    data: DataProps;
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Item({ data, onItemClicked }: ItemProps) {
    const [currentAmount, setCurrentAmount] = useState<number>(data.amount);

    const handleClick = () => {
        onItemClicked(data.id, data.title, currentAmount, setCurrentAmount);
    };

    return (
        <li>
            <p>
                [{data.id}] {data.title}: {currentAmount}
            </p>
            <input
                type="number"
                value={currentAmount}
                min="0"
                onChange={(e) => setCurrentAmount(Number(e.target.value))}
            />
            <button onClick={handleClick}>button</button>
        </li>
    );
}

interface ModalProps {
    id: number;
    title: string;
    amount: number;
    onAmountChange: (newAmount: number) => void;
    onClose: () => void;
}

function Modal({ id, title, amount, onAmountChange, onClose }: ModalProps) {
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    const handleClose = () => {
        onAmountChange(currentAmount);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {id}</h4>
                <h4>title: {title}</h4>
                <p>amount: {currentAmount}</p>
                <input
                    type="number"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    );
}

// onAmountChange는
// 이 코드에서의 key concept 중 하나입니다.
// 이 함수는 Item 컴포넌트에서 수량이 변경될 때마다 호출되며,
// Modal 컴포넌트에게 변경된 수량을 전달하는 역할을 합니다.
