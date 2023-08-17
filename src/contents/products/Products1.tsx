import React, { useState } from "react";

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
    const [modalData, setModalData] = useState<DataProps | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleItemClick = (
        data: DataProps,
        onAmountChange: (newAmount: number) => void
    ) => {
        setModalData(data);
        setIsVisible(true);
    };

    const handleModalClose = (newAmount: number) => {
        if (modalData) {
            const updatedData = Data.map((item) => {
                if (item.id === modalData.id) {
                    return { ...item, amount: newAmount };
                }
                return item;
            });
            Data.splice(0, Data.length, ...updatedData);
        }
        setIsVisible(false);
    };

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            {isVisible && modalData && (
                <Modal data={modalData} onClose={handleModalClose} />
            )}
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (
        data: DataProps,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Parent({ data, onItemClicked }: ParentProps) {
    return (
        <List>
            {data.map((item, index) => (
                <Item key={index} data={item} onItemClicked={onItemClicked} />
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
    onItemClicked: (
        data: DataProps,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Item({ data, onItemClicked }: ItemProps) {
    const [currentAmount, setCurrentAmount] = useState<number>(data.amount);

    const handleClick = () => {
        onItemClicked(data, setCurrentAmount);
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
    data: DataProps;
    onClose: (newAmount: number) => void;
}

function Modal({ data, onClose }: ModalProps) {
    const [newAmount, setNewAmount] = useState<number>(data.amount);

    const handleClose = () => {
        onClose(newAmount);
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {data.id}</h4>
                <h4>title: {data.title}</h4>
                <p>amount: {newAmount}</p>
                <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    );
}
