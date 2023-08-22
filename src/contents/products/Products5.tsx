// forwardRef + useRedecuer

import React, {
    memo,
    forwardRef,
    useImperativeHandle,
    useReducer,
    useRef,
    useState,
} from "react";

interface DataProps {
    id: number;
    title: string;
    amount: number;
}

const initialData: DataProps[] = [
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

const UPDATE_AMOUNT = "updateAmount";

type Action = {
    type: "updateAmount";
    payload: {
        id: number;
        newAmount: number;
    };
};

function dataReducer(state: DataProps[], action: Action): DataProps[] {
    switch (action.type) {
        case UPDATE_AMOUNT:
            const newState = state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, amount: action.payload.newAmount }
                    : item
            );
            return newState;
        default:
            return state;
    }
}

export default function App() {
    console.log("App");

    const modalRef = useRef<ModalHandles | null>(null);
    const [data, dispatch] = useReducer(dataReducer, initialData);

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
            <Parent
                data={data}
                onItemClicked={handleItemClick}
                dispatch={dispatch}
            />
            <Modal ref={modalRef} dispatch={dispatch} />
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    dispatch: React.Dispatch<Action>;
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

const Parent = memo(
    ({ data, dispatch, onItemClicked }: ParentProps) => {
        console.log("Parent");
        return (
            <ul>
                {data.map((item) => (
                    <Item
                        key={item.id}
                        data={item}
                        dispatch={dispatch}
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
    dispatch: React.Dispatch<Action>;
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

const Item = memo(
    ({ data, dispatch, onItemClicked }: ItemProps) => {
        console.log("Item", data.id);

        const { id, title, amount } = data;

        const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // console.log("Item handleAmountChange");

            const newAmount = Number(e.target.value);
            dispatch({
                type: UPDATE_AMOUNT,
                payload: {
                    id,
                    newAmount,
                },
            });
        };

        const handleItemClick = () => {
            // console.log("Item handleItemClick");
            onItemClicked(id, title, amount, (newAmount) => {
                dispatch({
                    type: UPDATE_AMOUNT,
                    payload: {
                        id,
                        newAmount,
                    },
                });
            });
        };
        return (
            <li>
                <p>
                    [{id}] {title}: {amount}
                </p>
                <input
                    type="number"
                    value={amount}
                    min="0"
                    onChange={handleAmountChange}
                />
                <button onClick={handleItemClick}>button</button>
            </li>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.data.amount === nextProps.data.amount;
    }
);

interface ModalProps {
    dispatch: React.Dispatch<Action>;
}

const Modal = memo(
    forwardRef<ModalHandles, ModalProps>(({ dispatch }, ref) => {
        console.log("Modal");

        const [isVisible, setIsVisible] = useState<boolean>(false);
        const [id, setId] = useState<number | null>(null);
        const [currentAmount, setCurrentAmount] = useState<number>(0);
        const [title, setTitle] = useState<string>("");

        useImperativeHandle(ref, () => ({
            openModal: (id, title, amount) => {
                setId(id);
                setTitle(title);
                setCurrentAmount(amount);
                setIsVisible(true);
            },
        }));

        const handleClose = () => {
            dispatch({
                type: UPDATE_AMOUNT,
                payload: {
                    id: id!,
                    newAmount: currentAmount,
                },
            });

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
                        min="0"
                        value={currentAmount}
                        onChange={(e) =>
                            setCurrentAmount(Number(e.target.value))
                        }
                    />
                    <button onClick={handleClose}>close</button>
                </div>
            </div>
        ) : null;
    }),
    (prevProps, nextProps) => {
        return prevProps.dispatch === nextProps.dispatch;
    }
);
