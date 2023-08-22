// forwardRef Modal

import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

interface DataProps {
    id: string;
    title: string;
    amount: number;
}

const Data: DataProps[] = [
    { id: "1", title: "title", amount: 1 },
    { id: "2", title: "title", amount: 2 },
    { id: "3", title: "title", amount: 3 },
];

interface OpenModalProps {
    id: string;
    title: string;
    amount: number;
    onAmountChange: (newAmount: number) => void;
}

interface ModalHandles {
    openModal: (props: OpenModalProps) => void;
}

export default function App() {
    console.log("App");
    const modalRef = useRef<ModalHandles | null>(null);

    const handleItemClick = (props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    };

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            <Modal ref={modalRef} />
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (props: OpenModalProps) => void;
}

function Parent({ data, onItemClicked }: ParentProps) {
    console.log("Parent");
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
    onItemClicked: (props: OpenModalProps) => void;
}

function Item({ data, onItemClicked }: ItemProps) {
    console.log("Item", data.id);

    const { id, title } = data;
    const [currentAmount, setCurrentAmount] = useState<number>(data.amount);

    const handleClick = () => {
        onItemClicked({
            id,
            title,
            amount: currentAmount,
            onAmountChange: setCurrentAmount,
        });
    };

    return (
        <li>
            <p>
                [{id}] {title}: {currentAmount}
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

const Modal = forwardRef<ModalHandles, {}>((props, ref) => {
    console.log("Modal");

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [id, setId] = useState<string | null>(null);
    const [currentAmount, setCurrentAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [onAmountChange, setOnAmountChange] = useState<
        ((newAmount: number) => void) | null
    >(null);

    useImperativeHandle(ref, () => ({
        openModal: ({ id, title, amount, onAmountChange }) => {
            setId(id);
            setTitle(title);
            setCurrentAmount(amount);
            setOnAmountChange(() => onAmountChange);
            setIsVisible(true);
        },
    }));

    const handleClose = () => {
        if (onAmountChange) {
            onAmountChange(currentAmount);
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

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
});
