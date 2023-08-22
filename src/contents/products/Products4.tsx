// useReducer

import React, {
    ChangeEvent,
    memo,
    useEffect,
    useReducer,
    useState,
} from "react";

interface DataProps {
    id: number;
    amount: number;
    title: string;
}

const Data: DataProps[] = [
    { id: 1, amount: 1, title: "title1" },
    { id: 2, amount: 2, title: "title2" },
    { id: 3, amount: 3, title: "title3" },
];

interface ModalState {
    selectedId: number | null;
    selectedAmount: number;
}

type ModalAction =
    | { type: "OPEN_MODAL"; id: number; amount: number }
    | { type: "UPDATE_AMOUNT"; amount: number }
    | { type: "CLOSE_MODAL" };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { selectedId: action.id, selectedAmount: action.amount };
        case "UPDATE_AMOUNT":
            return { ...state, selectedAmount: action.amount };
        case "CLOSE_MODAL":
            return { selectedId: null, selectedAmount: 0 };
        default:
            return state;
    }
};

export default function App() {
    console.log("App");
    const [state, dispatch] = useReducer(modalReducer, {
        selectedId: null,
        selectedAmount: 0,
    });

    const [updatedData, setUpdatedData] = useState(Data);

    const handleItemClick = (id: number, amount: number) => {
        dispatch({ type: "OPEN_MODAL", id, amount });
    };

    const handleModalAmountChange = (amount: number) => {
        dispatch({ type: "UPDATE_AMOUNT", amount });
    };

    const handleCloseModal = () => {
        if (state.selectedId !== null) {
            const newData = updatedData.map((item) =>
                item.id === state.selectedId
                    ? { ...item, amount: state.selectedAmount }
                    : item
            );
            setUpdatedData(newData);
        }
        dispatch({ type: "CLOSE_MODAL" });
    };

    return (
        <section className="products">
            <Parent data={updatedData} onItemClick={handleItemClick} />
            {state.selectedId !== null && (
                <Modal
                    selectedId={state.selectedId}
                    amount={state.selectedAmount}
                    onAmountChange={handleModalAmountChange}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClick: (id: number, amount: number) => void;
}

const Parent = memo(
    ({ data, onItemClick }: ParentProps) => {
        console.log("Parent");

        return (
            <ul>
                {data.map((item) => (
                    <Item key={item.id} data={item} onItemClick={onItemClick} />
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
    onItemClick: (id: number, amount: number) => void;
}

const Item = memo(
    ({ data, onItemClick }: ItemProps) => {
        console.log("Item", data.id);

        const { id, title, amount } = data;
        const [volume, setVolume] = useState<number>(amount);

        useEffect(() => {
            setVolume(amount);
        }, [amount]);

        const handleClick = () => {
            onItemClick(id, volume);
        };

        return (
            <li>
                <p>
                    [{id}] {title}: {volume}
                </p>
                <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <button onClick={handleClick}>Open Modal</button>
            </li>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.data === nextProps.data;
    }
);

interface ModalProps {
    selectedId: number;
    amount: number;
    onAmountChange: (amount: number) => void;
    onClose: () => void;
}

function Modal({ selectedId, amount, onAmountChange, onClose }: ModalProps) {
    console.log("Modal");

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        onAmountChange(Number(e.target.value));
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id : {selectedId}</h4>
                <p>Amount:</p>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
