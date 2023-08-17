// forwardRef Modal

import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

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

interface ModalHandles {
    openModal: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

export default function App() {
    const modalRef = useRef<ModalHandles | null>(null);

    const handleItemClick = (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => {
        modalRef.current?.openModal(id, title, amount, onAmountChange);
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
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
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

const Modal = forwardRef<ModalHandles, {}>((props, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const [currentAmount, setCurrentAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [onAmountChange, setOnAmountChange] = useState<
        ((newAmount: number) => void) | null
    >(null);

    useImperativeHandle(ref, () => ({
        openModal: (id, title, amount, onAmountChange) => {
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

    return isVisible ? (
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
    ) : null;
});
