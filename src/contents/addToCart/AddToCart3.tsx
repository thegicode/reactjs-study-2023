//  Data useReducer + Modal forwardRef + Modal useReducer

import React, {
    memo,
    forwardRef,
    useCallback,
    // useEffect,
    useImperativeHandle,
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

interface ModalHandles {
    openModal: (props: OpenModalProps) => void;
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

// --- Main App Component ---

export default function App() {
    console.log("App");

    // Modal 핸들러 참조
    const modalRef = useRef<ModalHandles | null>(null);
    // 데이터 및 관리자 초기화
    const [data, dispatch] = useReducer(dataReducer, initialData);

    // Modal 열기 핸들러
    const handleOpenModal = useCallback((props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    }, []);

    return (
        <section className="addToCart">
            {/* Sorting Controls */}
            <SortControls dispatch={dispatch} />

            {/* Product List  */}
            <ProductList
                data={data}
                handleOpenModal={handleOpenModal}
                dispatch={dispatch}
            />

            {/* Actions */}
            <ActionButton data={data} />

            {/* Modal */}
            <Modal ref={modalRef} dispatch={dispatch} />
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

        // useEffect(() => {
        //     dispatchAmount();
        // }, [localAmount, dispatchAmount]);

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

    const handleBlur = () => {
        setShowData("");
    };

    return (
        <div className="addToCart-actions">
            <span className="badge-count">{filteredData.length}</span>
            <button
                className="addToCartButton"
                onClick={handleClick}
                onBlur={handleBlur}
            >
                Data 가져오기
            </button>
            <pre>{showData}</pre>
        </div>
    );
};

// Modal 상태관리를 useReducer로 적용
enum ModalActionTypes {
    OPEN_MODAL = "OPEN_MODAL",
    UPDATE_AMOUNT = "UPDATE_AMOUNT",
    CLOSE_MODAL = "CLOSE_MODAL",
}

type ModalAction =
    | {
          type: ModalActionTypes.OPEN_MODAL;
          payload: {
              id: string;
              title: string;
              currentAmount: number;
          };
      }
    | {
          type: ModalActionTypes.UPDATE_AMOUNT;
          payload: number;
      }
    | {
          type: ModalActionTypes.CLOSE_MODAL;
      };

const initialModalState = {
    isVisible: false,
    id: null as string | null,
    title: "",
    currentAmount: 0,
};

interface ModalProps {
    dispatch: React.Dispatch<Action>;
}

function modalReducer(state: typeof initialModalState, action: ModalAction) {
    switch (action.type) {
        case ModalActionTypes.OPEN_MODAL:
            return {
                isVisible: true,
                id: action.payload.id,
                title: action.payload.title,
                currentAmount: action.payload.currentAmount,
            };
        case ModalActionTypes.UPDATE_AMOUNT:
            return {
                ...state,
                currentAmount: action.payload,
            };
        case ModalActionTypes.CLOSE_MODAL:
            return initialModalState;
        default:
            return state;
    }
}

const Modal = memo(
    forwardRef<ModalHandles, ModalProps>(({ dispatch }, ref) => {
        console.log("Modal");

        const [modalState, modalDispatch] = useReducer(
            modalReducer,
            initialModalState
        );

        const { isVisible, id, title, currentAmount } = modalState;

        useImperativeHandle(ref, () => ({
            // Item에서 Modal을 열 때
            openModal: ({ id, title, amount }: OpenModalProps) => {
                modalDispatch({
                    type: ModalActionTypes.OPEN_MODAL,
                    payload: {
                        id,
                        title,
                        currentAmount: amount,
                    },
                });
            },
        }));

        // input element change event : update amount
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                modalDispatch({
                    type: ModalActionTypes.UPDATE_AMOUNT,
                    payload: Number(e.target.value),
                });
            },
            []
        );

        // click confirm button : dispatch update id and amount
        const handleConfirm = useCallback(() => {
            dispatch({
                type: ActionTypes.UPDATE_AMOUNT,
                payload: {
                    id: id!,
                    newAmount: currentAmount,
                },
            });

            modalDispatch({
                type: ModalActionTypes.CLOSE_MODAL,
            });
        }, [currentAmount, dispatch, id]);

        const handleClose = useCallback(() => {
            modalDispatch({
                type: ModalActionTypes.CLOSE_MODAL,
            });
        }, []);

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
                        <button type="button" onClick={handleClose}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        );
    }),
    (prevProps, nextProps) => {
        // 성능을 위해 변경이 있는 dispatch만 리렌더링
        return prevProps.dispatch === nextProps.dispatch;
    }
);
