import React, {
    memo,
    useCallback,
    // useEffect,
    useState,
} from "react";

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

    const handleItemClick = useCallback((props: OpenModalProps) => {
        // ... 처리 로직이 필요한 경우 여기에 작성
    }, []);

    return (
        <section className="products">
            <AppContainer onItemClicked={handleItemClick} />
        </section>
    );
}

const AppContainer: React.FC<{
    onItemClicked: (props: OpenModalProps) => void;
}> = ({ onItemClicked }) => {
    console.log("AppContainer");

    const [modalProps, setModalProps] = useState<OpenModalProps | null>(null);

    const closeModal = useCallback(() => {
        setModalProps(null);
    }, []);

    // useEffect(() => {
    //     console.log("closeModal 변경되었습니다. ");
    // }, [closeModal]);

    return (
        <>
            <Parent data={Data} onItemClicked={setModalProps} />
            {modalProps && <Modal {...modalProps} onClose={closeModal} />}
        </>
    );
};

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
        return prevProps.data === nextProps.data;
    }
);

interface ModalProps extends OpenModalProps {
    onClose: () => void;
}

function Modal({ id, title, amount, onAmountChange, onClose }: ModalProps) {
    console.log("Modal");

    const [modalAmount, setModalAmount] = useState(amount);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModalAmount(Number(e.target.value));
    };

    const handleClose = () => {
        onAmountChange(modalAmount);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {id}</h4>
                <h4>title: {title}</h4>
                <p>amount: {modalAmount}</p>
                <input
                    type="number"
                    value={modalAmount}
                    onChange={handleAmountChange}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    );
}
