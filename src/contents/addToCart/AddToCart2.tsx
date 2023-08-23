// forwardRef + useRedecuer
import React, {
    memo,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useReducer,
    useRef,
    useState,
    useMemo,
} from "react";
import "../../css/addToCart.css";

interface DataProps {
    id: string;
    title: string;
    amount: number;
}

const initialData: DataProps[] = [
    { id: "1", title: "ccc", amount: 0 },
    { id: "2", title: "aaa", amount: 0 },
    { id: "3", title: "bbb", amount: 0 },
];

interface OpenModalProps extends DataProps {
    changeAmount: (newAmount: number) => void;
}

interface ModalHandles {
    openModal: (props: OpenModalProps) => void;
}

// Actions Types
const UPDATE_AMOUNT = "UPDATE_AMOUNT";
const SORT_ASC = "SORT_ASC";
const SORT_DESC = "SORT_DESC";

type Action =
    | {
          type: typeof UPDATE_AMOUNT;
          payload: {
              id: string;
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
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, amount: action.payload.newAmount }
                    : item
            );
        case SORT_ASC:
            return [...state].sort((a, b) => a.title.localeCompare(b.title));
        case SORT_DESC:
            return [...state].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return state;
    }
}

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
    return (
        <div className="addToCart-sorts">
            <button type="button" onClick={() => dispatch({ type: SORT_ASC })}>
                오름차순
            </button>
            <button type="button" onClick={() => dispatch({ type: SORT_DESC })}>
                내림차순
            </button>
        </div>
    );
};

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
        const [localAmount, setLocalAmount] = useState<number>(amount);

        const isMaxAmount = localAmount >= 10;
        const isMinAmount = localAmount <= 0;

        const handleInputClick = () => {
            handleOpenModal({
                id,
                title,
                amount,
                changeAmount: setLocalAmount,
            });
        };

        const increaseAmount = useCallback(() => {
            if (!isMaxAmount) setLocalAmount((prev) => prev + 1);
        }, [isMaxAmount]);

        const decreaseAmount = useCallback(() => {
            if (!isMinAmount) setLocalAmount((prev) => prev - 1);
        }, [isMinAmount]);

        const dispatchAmount = useCallback(() => {
            dispatch({
                type: UPDATE_AMOUNT,
                payload: {
                    id,
                    newAmount: localAmount,
                },
            });
        }, [localAmount, dispatch, id]);

        useEffect(() => {
            dispatchAmount();
        }, [localAmount, dispatchAmount]);

        return (
            <li
                className="addToCart-item"
                data-active={localAmount > 0}
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

        const initialModalState = useMemo(
            () => ({
                isVisible: false,
                id: null as string | null,
                title: "",
                currentAmount: 0,
                changeAmount: null as ((newAmount: number) => void) | null,
            }),
            []
        );

        const [modalState, setModalState] = useState(initialModalState);

        const { isVisible, id, title, currentAmount, changeAmount } =
            modalState;

        useImperativeHandle(ref, () => ({
            openModal: ({
                id,
                title,
                amount,
                changeAmount,
            }: OpenModalProps) => {
                setModalState({
                    isVisible: true,
                    id,
                    title,
                    currentAmount: amount,
                    changeAmount,
                });
            },
        }));

        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setModalState((prevState) => ({
                    ...prevState,
                    currentAmount: Number(e.target.value),
                }));
            },
            []
        );

        const handleConfirm = useCallback(() => {
            dispatch({
                type: UPDATE_AMOUNT,
                payload: {
                    id: id!,
                    newAmount: currentAmount,
                },
            });

            changeAmount?.(currentAmount);
            setModalState((prevState) => ({
                ...prevState,
                isVisible: false,
            }));
        }, [currentAmount, dispatch, id, changeAmount]);

        const handleClose = useCallback(() => {
            setModalState(initialModalState);
        }, [initialModalState]);

        // useEffect(() => {
        //     console.log("handleClose 변경");
        // }, [handleClose]);

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
