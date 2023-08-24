// Data useState + Modal forwardRef

import React, {
    forwardRef,
    memo,
    useCallback,
    // useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import "../../css/addToCart.css";

// --- Types & Enums ---

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

interface UpdateAmountProps {
    id: string;
    newAmount: number;
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

    // 데이터 및 관리자 초기화
    const [data, setData] = useState<DataProps[]>(initialData);

    // Modal 핸들러 참조
    const modalRef = useRef<ModalHandles | null>(null);

    // 데이터 핸들러
    const updateAmount = useCallback(({ id, newAmount }: UpdateAmountProps) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, amount: newAmount } : item
            )
        );
    }, []);

    const sortDataAscending = useCallback(() => {
        setData((prevData) =>
            [...prevData].sort((a, b) => a.title.localeCompare(b.title))
        );
    }, []);

    const sortDataDescending = useCallback(() => {
        setData((prevData) =>
            [...prevData].sort((a, b) => b.title.localeCompare(a.title))
        );
    }, []);

    // Modal 열기 핸들러
    const handleOpenModal = useCallback((props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    }, []);

    return (
        <section className="addToCart">
            {/* Sorting Controls */}
            <SortControls
                sortDataAscending={sortDataAscending}
                sortDataDescending={sortDataDescending}
            />

            {/* Product List  */}
            <ProductList
                data={data}
                updateAmount={updateAmount}
                handleOpenModal={handleOpenModal}
            />

            {/* Actions */}
            <ActionButton data={data} />

            {/* Modal */}
            <Modal ref={modalRef} updateAmount={updateAmount} />
        </section>
    );
}

// --- Sub Components ---

interface SortControlsProps {
    sortDataAscending: () => void;
    sortDataDescending: () => void;
}

const SortControls = memo(
    ({ sortDataAscending, sortDataDescending }: SortControlsProps) => {
        console.log("SortControls");

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
    }
);

interface ProductListProps {
    data: DataProps[];
    updateAmount: (props: UpdateAmountProps) => void;
    handleOpenModal: (props: OpenModalProps) => void;
}

const ProductList = memo(
    ({ data, updateAmount, handleOpenModal }: ProductListProps) => {
        console.log("ProductList");

        return (
            <ul className="addToCart-list">
                {data.map((item) => (
                    <Item
                        key={item.id}
                        data={item}
                        updateAmount={updateAmount}
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
    updateAmount: (props: UpdateAmountProps) => void;
    handleOpenModal: (props: OpenModalProps) => void;
}

const Item = memo(
    ({ data, updateAmount, handleOpenModal }: ItemProps) => {
        console.log("Item", data);

        const { id, title, amount } = data;

        const itemRef = useRef<HTMLLIElement>(null);

        const isMaxAmount = amount >= 10;
        const isMinAmount = amount <= 0;

        const dispatchAmount = useCallback(
            (currentAmount: number) => {
                updateAmount({ id, newAmount: currentAmount });
            },
            [updateAmount, id]
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
    updateAmount: (props: UpdateAmountProps) => void;
}

const Modal = memo(
    forwardRef<ModalHandles, ModalProps>(({ updateAmount }, ref) => {
        console.log("Modal");

        const initialModalState = useMemo(
            () => ({
                isVisible: false,
                id: null as string | null,
                title: "",
                currentAmount: 0,
            }),
            []
        );

        const [modalState, setModalState] = useState(initialModalState);

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
            updateAmount({ id: id!, newAmount: currentAmount });

            setModalState(initialModalState);
        }, [currentAmount, id, initialModalState, updateAmount]);

        // close Modal
        const handleClose = useCallback(() => {
            setModalState(initialModalState);
        }, [initialModalState]);

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
