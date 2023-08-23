// forwardRef + useRedecuer
import "../../css/addToCart.css";

import React, {
    memo,
    forwardRef,
    useCallback,
    useEffect,
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
    { id: 1, title: "ccc", amount: 0 },
    { id: 2, title: "aaa", amount: 0 },
    { id: 3, title: "bbb", amount: 0 },
];

interface ModalHandles {
    openModal: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

// Actions Types
const UPDATE_AMOUNT = "UPDATE_AMOUNT";
const SORT_ASC = "SORT_ASC";
const SORT_DESC = "SORT_DESC";

type Action =
    | {
          type: typeof UPDATE_AMOUNT;
          payload: {
              id: number;
              newAmount: number;
          };
      }
    | {
          type: typeof SORT_ASC;
      }
    | {
          type: typeof SORT_DESC;
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
        case SORT_ASC:
            return [...state].sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        case SORT_DESC:
            return [...state].sort((a, b) => {
                return b.title.localeCompare(a.title);
            });
        default:
            return state;
    }
}

export default function App() {
    console.log("App");

    const modalRef = useRef<ModalHandles | null>(null);
    const [data, dispatch] = useReducer(dataReducer, initialData);

    // Modal related handlers
    const handleOpenModal = (
        id: number,
        title: string,
        amount: number,
        onUpdateAmount: (newAmount: number) => void
    ) => {
        modalRef.current?.openModal(id, title, amount, onUpdateAmount);
    };

    return (
        <section className="addToCart">
            {/* Sorting Controls */}
            <SortControls dispatch={dispatch} />

            {/* Product List  */}
            <ProductList
                data={data}
                onItemClicked={handleOpenModal}
                dispatch={dispatch}
            />

            {/* Actions */}
            <DataActionButton data={data} />

            {/* Modal */}
            <Modal ref={modalRef} dispatch={dispatch} />
        </section>
    );
}

interface SortControlsProps {
    dispatch: React.Dispatch<Action>;
}

const SortControls = ({ dispatch }: SortControlsProps) => {
    const sortDataAscending = () => dispatch({ type: SORT_ASC });
    const sortDataDescending = () => dispatch({ type: SORT_DESC });

    return (
        <div className="addToCart-sorts">
            <button type="button" onClick={sortDataAscending}>
                오름차순
            </button>
            <button type="button" onClick={sortDataDescending}>
                내림차순
            </button>
        </div>
    );
};

interface ProductListProps {
    data: DataProps[];
    dispatch: React.Dispatch<Action>;
    onItemClicked: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

const ProductList = memo(
    ({ data, dispatch, onItemClicked }: ProductListProps) => {
        console.log("Parent");
        return (
            <ul className="addToCart-list">
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

const Item = ({ data, dispatch, onItemClicked }: ItemProps) => {
    console.log("Item", data.id, data);

    const { id, title, amount } = data;

    const itemRef = useRef<HTMLLIElement>(null);

    const [localAmount, setLocalAmount] = useState<number>(amount);

    const isMaxAmount = localAmount >= 10;
    const isMinAmount = localAmount <= 0;

    const increase = () => {
        if (!isMaxAmount) setLocalAmount((prev) => prev + 1);
    };

    const decrease = () => {
        if (!isMinAmount) setLocalAmount((prev) => prev - 1);
    };

    const activeItem = useCallback((value: number) => {
        if (itemRef.current) {
            itemRef.current.dataset.active = value > 0 ? "true" : "false";
        }
    }, []);

    const handleAmountChange = useCallback(() => {
        dispatch({
            type: UPDATE_AMOUNT,
            payload: {
                id,
                newAmount: localAmount,
            },
        });
    }, [localAmount, dispatch, id]);

    const handleItemClick = () => {
        onItemClicked(id, title, amount, setLocalAmount);
    };

    useEffect(() => {
        activeItem(localAmount);
        handleAmountChange();
    }, [activeItem, localAmount, handleAmountChange]);

    return (
        <li className="addToCart-item" data-active="false" ref={itemRef}>
            <p>
                [{id}] : {title} | amount: {amount}
            </p>
            <div className="amount-container">
                <input
                    type="number"
                    value={amount}
                    min="0"
                    max="10"
                    className="amount-input"
                    onClick={handleItemClick}
                    readOnly
                />
                <div className="amount-controls">
                    <button
                        type="button"
                        className="increase-button"
                        disabled={localAmount >= 10}
                        onClick={increase}
                    >
                        +
                    </button>
                    <button
                        type="button"
                        className="descrease-button"
                        disabled={localAmount <= 0}
                        onClick={decrease}
                    >
                        -
                    </button>
                </div>
            </div>
        </li>
    );
};

interface DataActionButtonProps {
    data: DataProps[];
}

const DataActionButton = ({ data }: DataActionButtonProps) => {
    const handleFilteredDataDisplay = () => {
        const filteredData = data
            .filter((item) => item.amount > 0)
            .map(({ id, amount }) => ({ id, amount }));
        console.log(filteredData);
    };

    return (
        <div className="addToCart-actions">
            <button
                onClick={handleFilteredDataDisplay}
                className="addToCartButton"
            >
                Data 가져오기
            </button>
        </div>
    );
};

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
        const [onAmountChange, setOnAmountChange] = useState<
            ((newAmount: number) => void) | null
        >(null);

        useImperativeHandle(ref, () => ({
            openModal: (id, title, amount, onChangeCallback) => {
                setId(id);
                setTitle(title);
                setCurrentAmount(amount);
                setOnAmountChange(() => onChangeCallback);
                setIsVisible(true);
            },
        }));

        const handleConfirm = () => {
            dispatch({
                type: UPDATE_AMOUNT,
                payload: {
                    id: id!,
                    newAmount: currentAmount,
                },
            });

            onAmountChange && onAmountChange(currentAmount);
            setIsVisible(false);
        };

        const handleClose = () => {
            setIsVisible(false);
        };

        if (!isVisible) return null;

        return (
            <div className="modal">
                <div className="modal-container">
                    <h3>Modal</h3>
                    <div className="modal-contents">
                        <p>id: {id}</p>
                        <p>title: {title}</p>
                        <p>amount: {currentAmount}</p>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={currentAmount}
                            onChange={(e) =>
                                setCurrentAmount(Number(e.target.value))
                            }
                        />
                    </div>

                    {/* <button onClick={handleClose}>close</button> */}
                    <div className="modal-actions">
                        <button type="button" onClick={handleConfirm}>
                            confirm
                        </button>
                        <button type="button" onClick={handleClose}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        );
    }),
    (prevProps, nextProps) => {
        return prevProps.dispatch === nextProps.dispatch;
    }
);
