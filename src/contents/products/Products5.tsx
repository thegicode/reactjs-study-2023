// forwardRef + useRedecuer

import React, {
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

type Action = {
    type: "updateAmount";
    payload: {
        id: number;
        newAmount: number;
    };
};

function dataReducer(state: DataProps[], action: Action): DataProps[] {
    switch (action.type) {
        case "updateAmount":
            const newState = state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, amount: action.payload.newAmount }
                    : item
            );
            console.log("dataReducer", newState);
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

function Parent({ data, dispatch, onItemClicked }: ParentProps) {
    console.log("Parent");
    return (
        <ul>
            {data.map((item, index) => (
                <Item
                    key={index}
                    data={item}
                    dispatch={dispatch}
                    onItemClicked={onItemClicked}
                />
            ))}
        </ul>
    );
}

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

function Item({ data, dispatch, onItemClicked }: ItemProps) {
    console.log("Item", data.id);

    const [currentAmount, setCurrentAmount] = useState<number>(data.amount);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = Number(e.target.value);
        setCurrentAmount(newAmount);
        dispatch({
            type: "updateAmount",
            payload: {
                id: data.id,
                newAmount: newAmount,
            },
        });
    };

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
                onChange={handleChange}
            />
            <button onClick={handleClick}>button</button>
        </li>
    );
}

interface ModalProps {
    dispatch: React.Dispatch<Action>;
}

const Modal = forwardRef<ModalHandles, ModalProps>((props, ref) => {
    console.log("Modal");

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
        // props.dispatch({
        //     type: "updateAmount",
        //     payload: {
        //         id: id!,
        //         newAmount: currentAmount,
        //     },
        // });
        props.dispatch({
            type: "updateAmount",
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
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    ) : null;
});
