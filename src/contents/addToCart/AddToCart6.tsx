// Data useReducer + useContext + Modal forwardRef

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
    useContext,
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

// --- Context ---
const DataDispatchContext = React.createContext<React.Dispatch<Action> | null>(
    null
);

// --- Main App Component ---

export default function AddToCart6() {
    console.log("App");

    // 데이터 및 관리자 초기화
    const [data, dispatch] = useReducer(dataReducer, initialData);

    // Modal 핸들러 참조
    const modalRef = useRef<ModalHandles | null>(null);

    // Modal 열기 핸들러
    const handleOpenModal = useCallback((props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    }, []);

    /* Item과 Modal에서 동일한 기능을 하는 updateAmount를 공통의 함수로 뺄 것이냐? 
        diapatch로 받아 각각 작성해서 구현할 것이냐? */

    return (
        <DataDispatchContext.Provider value={dispatch}>
            <section className="addToCart">
                <SortControls />
                <ProductList data={data} handleOpenModal={handleOpenModal} />
                <ActionButton data={data} />
                <Modal ref={modalRef} />
            </section>
        </DataDispatchContext.Provider>
    );
}

// --- Sub Components ---

const SortControls = memo(() => {
    console.log("SortControls");

    const dispatch = useContext(DataDispatchContext);
    if (!dispatch) {
        throw new Error("DataDispatchContext not available.");
    }

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
    handleOpenModal: (props: OpenModalProps) => void;
}

const ProductList = memo(
    ({ data, handleOpenModal }: ProductListProps) => {
        console.log("ProductList");

        return (
            <ul className="addToCart-list">
                {data.map((item) => (
                    <Item
                        key={item.id}
                        data={item}
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
    handleOpenModal: (props: OpenModalProps) => void;
}

const Item = memo(
    ({ data, handleOpenModal }: ItemProps) => {
        console.log("Item", data);

        const dispatch = useContext(DataDispatchContext);
        if (!dispatch) {
            throw new Error("DataDispatchContext not available.");
        }

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

interface ModalProps {
    // dispatch: React.Dispatch<Action>;
}

const initialModalState = {
    isVisible: false,
    id: null as string | null,
    title: "",
    currentAmount: 0,
};

const resetModalState = () => initialModalState;
// resetModalState() 함수를 사용:
// 함수가 항상 동일한 객체를 반환합니다.
// 상태 초기화 로직이 변경될 경우, 함수 내부만 수정하면 되므로 유지보수가 더 용이합니다.
// 예를 들어, 초기 상태를 설정하는 데 로직이 필요하거나 추가적인 연산이 필요한 경우 함수 내에서 수행할 수 있습니다.

const Modal = memo(
    forwardRef<ModalHandles, ModalProps>((props, ref) => {
        console.log("Modal");

        const dispatch = useContext(DataDispatchContext);
        if (!dispatch) {
            throw new Error("DataDispatchContext not available.");
        }

        const [modalState, setModalState] = useState(resetModalState);

        const { isVisible, id, title, currentAmount } = modalState;

        useImperativeHandle(ref, () => ({
            // Item에서 Modal을 열 때
            openModal: ({ id, title, amount }: OpenModalProps) => {
                setModalState({
                    isVisible: true,
                    id,
                    title,
                    currentAmount: amount,
                });
            },
        }));

        // input element change event : update amount
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setModalState((prevState) => ({
                    ...prevState,
                    currentAmount: Number(e.target.value),
                }));
            },
            []
        );

        // click confirm button : dispatch update amount, close Modal
        const handleConfirm = useCallback(() => {
            dispatch({
                type: ActionTypes.UPDATE_AMOUNT,
                payload: {
                    id: id!,
                    newAmount: currentAmount,
                },
            });

            setModalState(resetModalState());
        }, [currentAmount, dispatch, id]);

        // close Modal
        const handleClose = useCallback(() => {
            setModalState(resetModalState());
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
    })
);
