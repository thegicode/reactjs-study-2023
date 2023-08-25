// Data useContext + Modal forwardRef

import React, {
    createContext,
    forwardRef,
    memo,
    useCallback,
    useContext,
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

// --- Context ---
interface DataContextType {
    data: DataProps[];
    setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
}
const defaultContextValue: DataContextType = {
    data: [],
    setData: () => {},
};
const DataContext = createContext<DataContextType>(defaultContextValue);

// --- Initial States ---

const initialData: DataProps[] = [
    { id: "1", title: "ccc", amount: 0 },
    { id: "2", title: "aaa", amount: 0 },
    { id: "3", title: "bbb", amount: 0 },
];

const initialModalState = () => ({
    isVisible: false,
    id: null as string | null,
    title: "",
    currentAmount: 0,
});

// --- Main App Component ---

export default function AddToCart5() {
    console.log("App");

    // 데이터 및 관리자 초기화
    const [data, setData] = useState<DataProps[]>(initialData);

    // Modal 핸들러 참조
    const modalRef = useRef<ModalHandles | null>(null);

    // Modal 열기 핸들러
    const handleOpenModal = useCallback((props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    }, []);

    return (
        <DataContext.Provider value={{ data, setData }}>
            <section className="addToCart">
                <SortControls />
                <ProductList handleOpenModal={handleOpenModal} />
                <ActionButton />
                <Modal ref={modalRef} />
            </section>
        </DataContext.Provider>
    );
}

// --- Sub Components ---

const SortControls = memo(() => {
    console.log("SortControls");

    const { setData } = useContext(DataContext);

    const sortDataAscending = useCallback(() => {
        setData((prevData) =>
            [...prevData].sort((a, b) => a.title.localeCompare(b.title))
        );
    }, [setData]);

    const sortDataDescending = useCallback(() => {
        setData((prevData) =>
            [...prevData].sort((a, b) => b.title.localeCompare(a.title))
        );
    }, [setData]);

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
    handleOpenModal: (props: OpenModalProps) => void;
}

const ProductList = memo(({ handleOpenModal }: ProductListProps) => {
    console.log("ProductList");

    const { data } = useContext(DataContext);

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
});

interface ItemProps {
    data: DataProps;
    handleOpenModal: (props: OpenModalProps) => void;
}

const Item = memo(
    ({ data, handleOpenModal }: ItemProps) => {
        console.log("Item", data);

        const { setData } = useContext(DataContext);

        const { id, title, amount } = data;

        const itemRef = useRef<HTMLLIElement>(null);

        const isMaxAmount = amount >= 10;
        const isMinAmount = amount <= 0;

        const updateAmount = useCallback(
            (newAmount: number) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === id ? { ...item, amount: newAmount } : item
                    )
                );
            },
            [id, setData]
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
                updateAmount(amount + 1);
            }
        }, [isMaxAmount, updateAmount, amount]);

        const decreaseAmount = useCallback(() => {
            if (!isMinAmount) {
                updateAmount(amount - 1);
            }
        }, [isMinAmount, updateAmount, amount]);

        // useEffect(() => {
        //     updateAmount();
        // }, [localAmount, updateAmount]);

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
        // id, title, amount 중 하나라도 변경되면 리렌더링을 트리거
        return (
            prevProps.data.id === nextProps.data.id &&
            prevProps.data.title === nextProps.data.title &&
            prevProps.data.amount === nextProps.data.amount
        );
    }
);

const ActionButton = () => {
    console.log("ActionButton");

    const { data } = useContext(DataContext);

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

const Modal = memo(
    forwardRef<ModalHandles, {}>((props, ref) => {
        console.log("Modal");

        const { setData } = useContext(DataContext);

        // Lazy Initialization: 컴포넌트가 처음 렌더링될 때만 함수를 실행
        const [modalState, setModalState] = useState(() => initialModalState());
        // const [modalState, setModalState] = useState(initialModalState);

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

        const changeDataAmount = useCallback(
            (id: string, newAmount: number) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === id ? { ...item, amount: newAmount } : item
                    )
                );
            },
            [setData]
        );

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
            changeDataAmount(id!, currentAmount);

            setModalState(initialModalState);
        }, [currentAmount, id, changeDataAmount]);

        // close Modal
        const handleClose = useCallback(() => {
            setModalState(initialModalState);
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
