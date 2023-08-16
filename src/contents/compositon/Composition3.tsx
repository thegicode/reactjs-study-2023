// Context

import React, {
    ChangeEvent,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

interface DataProps {
    a: number;
    b: number;
    title: string;
    // 다른 필드들을 추가할 수 있습니다
}

const Data: DataProps[] = [
    { a: 1, b: 1, title: "title1" },
    { a: 2, b: 2, title: "title2" },
    { a: 3, b: 3, title: "title3" },
    // 더 많은 데이터를 여기에 추가할 수 있습니다
];

interface ModalContextType {
    selectedId: number | null;
    selectedAmount: number;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function App() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedAmount, setSelectedAmount] = useState<number>(0);

    const modalContextValue = {
        selectedId,
        selectedAmount,
        setSelectedId,
        setSelectedAmount,
    };

    return (
        <ModalContext.Provider value={modalContextValue}>
            <Parent data={Data} />
            <Modal />
        </ModalContext.Provider>
    );
}

interface ParentProps {
    data: DataProps[];
}
function Parent({ data }: ParentProps) {
    return (
        <List>
            {data.map((item, index) => (
                <Item key={index} data={item} />
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
}
function Item({ data }: ItemProps) {
    const [amount, setAmount] = useState<number>(data.b);
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        if (modalContext?.selectedId === data.a) {
            setAmount(modalContext.selectedAmount);
        }
    }, [modalContext?.selectedAmount, modalContext?.selectedId, data.a]);

    const handleClick = () => {
        if (modalContext) {
            modalContext.setSelectedId(data.a);
            modalContext.setSelectedAmount(amount);
        }
    };

    return (
        <li>
            <p>
                [{data.a}] {data.title}: {amount}
            </p>
            <input
                type="number"
                value={amount}
                min="0"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={handleClick}>button</button>
        </li>
    );
}

function Modal() {
    const [localAmount, setLocalAmount] = useState<number>(0);
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        if (modalContext?.selectedAmount) {
            setLocalAmount(modalContext.selectedAmount);
        }
    }, [modalContext?.selectedAmount]);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalAmount(Number(e.target.value));
        if (modalContext) {
            modalContext.setSelectedAmount(Number(e.target.value));
        }
    };

    if (modalContext && modalContext.selectedId !== null) {
        return (
            <div className="modal">
                <div className="modal-container">
                    <h3>Modal</h3>
                    <h4>id : {modalContext.selectedId}</h4>
                    <p>amount: </p>
                    <input
                        type="number"
                        value={localAmount}
                        onChange={handleAmountChange}
                    />
                    <button onClick={() => modalContext.setSelectedId(null)}>
                        close
                    </button>
                </div>
            </div>
        );
    }
    return null;
}
