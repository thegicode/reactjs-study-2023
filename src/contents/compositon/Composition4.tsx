// forwardRef

import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

interface DataProps {
    a: number;
    b: number;
    title: string;
}

const Data: DataProps[] = [
    { a: 1, b: 1, title: "title" },
    { a: 2, b: 2, title: "title" },
    { a: 3, b: 3, title: "title" },
];

interface ModalHandles {
    openModal: (
        id: number,
        amount: number,
        title: string,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

const Modal = forwardRef<ModalHandles, {}>((props, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [onAmountChange, setOnAmountChange] = useState<
        ((newAmount: number) => void) | null
    >(null);

    useImperativeHandle(ref, () => ({
        openModal: (id, amount, title, onAmountChange) => {
            setId(id);
            setAmount(amount);
            setTitle(title);
            setOnAmountChange(() => onAmountChange);
            setIsVisible(true);
        },
    }));

    const handleClose = () => {
        if (onAmountChange) {
            onAmountChange(amount);
        }
        setIsVisible(false);
    };

    return isVisible ? (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {id}</h4>
                <h4>title: {title}</h4>
                <p>amount: {amount}</p>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    ) : null;
});

export default function App() {
    const modalRef = useRef<ModalHandles | null>(null);

    const handleItemClick = (
        id: number,
        amount: number,
        title: string,
        onAmountChange: (newAmount: number) => void
    ) => {
        modalRef.current?.openModal(id, amount, title, onAmountChange);
    };

    return (
        <>
            <Parent data={Data} onItemClicked={handleItemClick} />
            <Modal ref={modalRef} />
        </>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (
        id: number,
        amount: number,
        title: string,
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
        id: number,
        amount: number,
        title: string,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Item({ data, onItemClicked }: ItemProps) {
    const [amount, setAmount] = useState<number>(data.b);

    const handleClick = () => {
        onItemClicked(data.a, amount, data.title, setAmount);
    };

    return (
        <li onClick={handleClick}>
            <p>
                [{data.a}] {data.title}: {amount}
            </p>
            <input
                type="number"
                value={amount}
                min="0"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </li>
    );
}
