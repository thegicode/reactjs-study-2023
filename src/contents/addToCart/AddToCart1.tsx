import "../../css/addToCart.css";

import React, { memo, useCallback, useRef, useEffect, useState } from "react";

interface tempDataProps {
    id: string;
    title: string;
}
const tempData: tempDataProps[] = [
    { id: "1", title: "ccc" },
    { id: "2", title: "aaa" },
    { id: "3", title: "bbb" },
];

interface DataProps extends tempDataProps {
    amount: number;
}
const Data = tempData.map((item) => ({ ...item, amount: 0 }));

interface OpenModalProps {
    id: string;
    title: string;
    amount: number;
    onAmountChange: (newAmount: number) => void;
}

type SortType = "asc" | "desc";

export default function App() {
    console.log("App");

    const [modalProps, setModalProps] = useState<OpenModalProps | null>(null);
    const [sortOrder, setSortOrder] = useState<SortType | null>(null);

    const handleItemClick = useCallback((props: OpenModalProps) => {
        setModalProps(props);
    }, []);

    const closeModal = useCallback(() => {
        setModalProps(null);
    }, []);

    const handleSort = (order: SortType) => {
        setSortOrder(order);
    };

    const sortedData = [...Data].sort((a, b) => {
        if (sortOrder === "asc") return a.title.localeCompare(b.title);
        if (sortOrder === "desc") return b.title.localeCompare(a.title);
        return 0;
    });

    const handleSortAsc = () => {
        handleSort("asc");
        console.log(sortedData);
    };

    // useEffect(() => {
    //     console.log("handleItemClick 변경되었습니다.");
    // }, [handleItemClick]);

    return (
        <div className="addToCart">
            <div className="addToCart-sorts">
                <button type="button" onClick={handleSortAsc}>
                    오름차순
                </button>
                <button type="button" onClick={() => handleSort("desc")}>
                    내림차순
                </button>
            </div>
            <Parent data={sortedData} onItemClicked={handleItemClick} />
            {modalProps && <Modal {...modalProps} onClose={closeModal} />}
        </div>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (props: OpenModalProps) => void;
}

const Parent = memo(
    ({ data, onItemClicked }: ParentProps) => {
        console.log("Parent");

        return (
            <ul className="addToCart-list">
                {data.map((item, index) => (
                    <Item
                        key={index}
                        data={item}
                        onItemClicked={onItemClicked}
                    />
                ))}
            </ul>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.data === nextProps.data;
    }
);

interface ItemProps {
    data: DataProps;
    onItemClicked: (props: OpenModalProps) => void;
}

const Item = memo(
    ({ data, onItemClicked }: ItemProps) => {
        console.log("Item", data.id);

        const { id, title, amount } = data;
        const [currentAmount, setCurrentAmount] = useState<number>(amount);
        const itemRef = useRef<HTMLLIElement>(null);

        const isValidAmount = (value: number) => value >= 0 && value <= 10;

        const increase = () => {
            const value = currentAmount + 1;
            if (!isValidAmount(value)) return;

            setCurrentAmount(value);
        };

        const decrease = () => {
            const value = currentAmount - 1;
            if (!isValidAmount(value)) return;

            setCurrentAmount(value);
        };

        const openModal = () => {
            onItemClicked({
                id,
                title,
                amount: currentAmount,
                onAmountChange: setCurrentAmount,
            });
        };

        const activeItem = useCallback((value: number) => {
            if (itemRef.current) {
                itemRef.current.dataset.active = value > 0 ? "true" : "false";
            }
        }, []);

        // useEffect(() => {
        //     console.log("activeItem 변경");
        // }, [activeItem]);

        useEffect(() => {
            activeItem(currentAmount);
        }, [activeItem, currentAmount]);

        return (
            <li ref={itemRef} className="addToCart-item" data-active="false">
                <p className="title">
                    [{id}] : {title}
                </p>
                <div className="amount-container">
                    <input
                        type="number"
                        min="0"
                        max="10"
                        className="amount-input"
                        value={currentAmount}
                        onClick={openModal}
                        readOnly
                    />
                    <div className="amount-controls">
                        <button
                            type="button"
                            className="amount-increase-button"
                            onClick={increase}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            className="amount-descrease-button"
                            onClick={decrease}
                        >
                            -
                        </button>
                    </div>
                </div>
            </li>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.data === nextProps.data;
    }
);

interface ModalProps extends OpenModalProps {
    onClose: () => void;
}

function Modal({ id, title, amount, onAmountChange, onClose }: ModalProps) {
    console.log("Modal");

    const [modalAmount, setModalAmount] = useState(amount);

    const isValidAmount = (value: number) => value >= 0 && value <= 10;

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isValidAmount(value)) return;
        setModalAmount(value);
    };

    const handleConfirm = () => {
        onAmountChange(modalAmount);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {id}</h4>
                <h4>title: {title}</h4>
                <p>amount: {modalAmount}</p>
                <input
                    type="number"
                    value={modalAmount}
                    onChange={handleAmountChange}
                />
                <div className="actions">
                    <button type="button" onClick={handleConfirm}>
                        confirm
                    </button>
                    <button type="button" onClick={onClose}>
                        close
                    </button>
                </div>
            </div>
        </div>
    );
}
