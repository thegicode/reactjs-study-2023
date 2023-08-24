// Data useReducer + Modal useState

import React, {
    memo,
    useCallback,
    // useEffect,
    useReducer,
    useRef,
    useState,
    useMemo,
} from "react";
import "../../css/addToCart.css";

// --- Types & Enums ---

enum ActionTypes {
    UPDATE_AMOUNT = "UPDATE_AMOUNT",
    SORT_ASC = "SORT_ASC",
    SORT_DESC = "SORT_DESC",
}

interface DataProps {
    id: string;
    title: string;
    amount: number;
}

interface OpenModalProps extends DataProps {
    // changeAmount: (newAmount: number) => void;
}

type Action =
    | {
          type: ActionTypes.UPDATE_AMOUNT;
          payload: {
              id: string;
              newAmount: number;
          };
      }
    | {
          type: ActionTypes.SORT_ASC;
      }
    | {
          type: ActionTypes.SORT_DESC;
      };

// --- Reducers ---

function dataReducer(state: DataProps[], action: Action): DataProps[] {
    switch (action.type) {
        case ActionTypes.UPDATE_AMOUNT:
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, amount: action.payload.newAmount }
                    : item
            );
        case ActionTypes.SORT_ASC:
            return [...state].sort((a, b) => a.title.localeCompare(b.title));
        case ActionTypes.SORT_DESC:
            return [...state].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return state;
    }
}

// --- Initial States ---

const initialData: DataProps[] = [
    { id: "1", title: "ccc", amount: 0 },
    { id: "2", title: "aaa", amount: 0 },
    { id: "3", title: "bbb", amount: 0 },
];

const initialModalState = {
    isVisible: false,
    id: null as string | null,
    title: "",
    currentAmount: 0,
};

// --- Main App Component ---

export default function App() {
    console.log("App");

    // 데이터 및 관리자 초기화
    const [data, dispatch] = useReducer(dataReducer, initialData);

    // handle Modal
    const [modalState, setModalState] = useState(initialModalState);

    // Item에서 Modal 열기 핸들러
    const handleOpenModal = useCallback(
        ({ id, title, amount }: OpenModalProps) => {
            setModalState({
                isVisible: true,
                id,
                title,
                currentAmount: amount,
            });
        },
        []
    );

    return (
        <section className="addToCart">
            <SortControls dispatch={dispatch} />
            <ProductList
                data={data}
                dispatch={dispatch}
                handleOpenModal={handleOpenModal}
            />
            <ActionButton data={data} />
            <Modal
                state={modalState}
                setState={setModalState}
                dispatch={dispatch}
            />
        </section>
    );
}

// --- Sub Components ---

interface SortControlsProps {
    dispatch: React.Dispatch<Action>;
}

const SortControls = memo(({ dispatch }: SortControlsProps) => {
    console.log("SortControls");

    const sortDataAscending = () => dispatch({ type: ActionTypes.SORT_ASC });
    const sortDataDescending = () => dispatch({ type: ActionTypes.SORT_DESC });

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
});

interface ProductListProps {
    data: DataProps[];
    dispatch: React.Dispatch<Action>;
    handleOpenModal: (props: OpenModalProps) => void;
}

const ProductList = memo(
    ({ data, dispatch, handleOpenModal }: ProductListProps) => {
        console.log("ProductList");

        return (
            <ul className="addToCart-list">
                {data.map((item) => (
                    <Item
                        key={item.id}
                        data={item}
                        dispatch={dispatch}
                        handleOpenModal={handleOpenModal}
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
    handleOpenModal: (props: OpenModalProps) => void;
}

const Item = memo(
    ({ data, dispatch, handleOpenModal }: ItemProps) => {
        console.log("Item", data);

        const { id, title, amount } = data;

        const itemRef = useRef<HTMLLIElement>(null);

        const isMaxAmount = amount >= 10;
        const isMinAmount = amount <= 0;

        const dispatchAmount = useCallback(
            (currentAmount: number) => {
                dispatch({
                    type: ActionTypes.UPDATE_AMOUNT,
                    payload: {
                        id,
                        newAmount: currentAmount,
                    },
                });
            },
            [dispatch, id]
        );

        // Modal 열기, App에 있는 handleOpenModal
        const handleInputClick = () => {
            handleOpenModal({
                id,
                title,
                amount,
            });
        };

        const increaseAmount = useCallback(() => {
            if (!isMaxAmount) {
                dispatchAmount(amount + 1);
            }
        }, [isMaxAmount, dispatchAmount, amount]);

        const decreaseAmount = useCallback(() => {
            if (!isMinAmount) {
                dispatchAmount(amount - 1);
            }
        }, [isMinAmount, dispatchAmount, amount]);

        return (
            <li
                className="addToCart-item"
                data-active={amount > 0}
                ref={itemRef}
            >
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
                        onClick={handleInputClick}
                        readOnly
                    />
                    <div className="amount-controls">
                        <button
                            type="button"
                            className="increase-button"
                            disabled={isMaxAmount}
                            onClick={increaseAmount}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            className="descrease-button"
                            disabled={isMinAmount}
                            onClick={decreaseAmount}
                        >
                            -
                        </button>
                    </div>
                </div>
            </li>
        );
    },
    (prevProps, nextProps) => {
        // 성능을 위해 변경이 있는 데이터만 리렌더링
        return prevProps.data.amount === nextProps.data.amount;
    }
);

interface ActionButtonProps {
    data: DataProps[];
}

const ActionButton = ({ data }: ActionButtonProps) => {
    console.log("ActionButton");

    const [showData, setShowData] = useState<string>("");

    const filteredData = useMemo(() => {
        return data.filter((item) => item.amount > 0);
    }, [data]);

    const handleClick = () => {
        setShowData(
            `Data 가져오기 버튼 클릭 후 \n${JSON.stringify(
                filteredData,
                null,
                4
            )}`
        );
    };

    return (
        <div className="addToCart-actions">
            <span className="badge-count">{filteredData.length}</span>
            <button
                className="addToCartButton"
                onClick={handleClick}
                onBlur={() => setShowData("")}
            >
                Data 가져오기
            </button>
            <pre>{showData}</pre>
        </div>
    );
};

interface ModalProps {
    state: typeof initialModalState;
    setState: React.Dispatch<React.SetStateAction<typeof initialModalState>>;
    // closeModal: () => void;
    dispatch: React.Dispatch<Action>;
}

const Modal = memo(
    ({ state, setState, dispatch }: ModalProps) => {
        console.log("Modal");

        const { isVisible, id, title, currentAmount } = state;

        const closeModal = useCallback(() => {
            setState(initialModalState);
        }, [setState]);

        // input element change event : update amount
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => ({
                    ...prevState,
                    currentAmount: Number(e.target.value),
                }));
            },
            [setState]
        );

        // click confirm button : dispatch update amount, close Modal
        const handleConfirm = useCallback(() => {
            if (id) {
                dispatch({
                    type: ActionTypes.UPDATE_AMOUNT,
                    payload: {
                        id,
                        newAmount: currentAmount,
                    },
                });
            }

            closeModal();
        }, [currentAmount, dispatch, id, closeModal]);

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
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={handleConfirm}>
                            confirm
                        </button>
                        <button type="button" onClick={() => closeModal()}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.state === nextProps.state;
    }
);
