import { ChangeEvent, memo, useReducer, useState } from "react";

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

export default function App() {
    console.log("App");

    const { openModal, Modal } = useModal();

    const handleItemClick = (props: OpenModalProps) => {
        openModal(props);
    };

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            <Modal />
        </section>
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
            <ul>
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
                    [{id}] {title}, amount: {currentAmount}
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
    },
    (prevProps, nextProps) => {
        return prevProps.data.amount === nextProps.data.amount;
    }
);

function useModal() {
    const OPEN_MODAL = "OPEN_MODAL";
    const CLOSE_MODAL = "CLOSE_MODAL";
    const SET_AMOUNT = "SET_AMOUNT";

    type State = {
        isVisible: boolean;
        id: string | null;
        title: string;
        amount: number;
        onAmountChange: ((newAmount: number) => void) | null;
    };

    type Action =
        | {
              type: typeof OPEN_MODAL;
              id: string | null;
              title: string;
              amount: number;
              onAmountChange: ((newAmount: number) => void) | null;
          }
        | { type: typeof CLOSE_MODAL }
        | { type: typeof SET_AMOUNT; amount: number };

    const initialState = {
        isVisible: false,
        id: null,
        title: "",
        amount: 0,
        onAmountChange: null,
    };

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case OPEN_MODAL:
                const { id, title, amount, onAmountChange } = action;
                return {
                    isVisible: true,
                    id,
                    title,
                    amount,
                    onAmountChange,
                };
            case CLOSE_MODAL:
                return initialState;
            case SET_AMOUNT:
                return {
                    ...state,
                    amount: action.amount,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const openModal = ({
        id,
        title,
        amount,
        onAmountChange,
    }: OpenModalProps) => {
        dispatch({
            type: OPEN_MODAL,
            id,
            title,
            amount,
            onAmountChange,
        });
    };

    const closeModal = () => {
        if (state.onAmountChange) {
            state.onAmountChange(state.amount);
        }

        dispatch({ type: CLOSE_MODAL });
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_AMOUNT, amount: Number(e.target.value) });
    };

    const Modal = () => {
        return state.isVisible ? (
            <div className="modal">
                <div className="modal-container">
                    <h3>Modal</h3>
                    <h4>id: {state.id}</h4>
                    <h4>title: {state.title}</h4>
                    <p>amount: {state.amount}</p>
                    <input
                        type="number"
                        value={state.amount}
                        onChange={handleAmountChange}
                    />
                    <button onClick={closeModal}>close</button>
                </div>
            </div>
        ) : null;
    };

    return { openModal, closeModal, Modal, modalState: state };
}
