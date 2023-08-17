// forwardRef Item

import React, {
    createRef,
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

interface DataProps {
    id: number;
    title: string;
    amount: number;
}

const Data: DataProps[] = [
    { id: 1, title: "title", amount: 1 },
    { id: 2, title: "title", amount: 2 },
    { id: 3, title: "title", amount: 3 },
];

interface ItemHandles {
    openModal: (
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

export default function App() {
    const itemRefs = useRef<Array<React.RefObject<ItemHandles>>>([]);

    useEffect(() => {
        itemRefs.current = Array(Data.length)
            .fill(null)
            .map((_, i) => itemRefs.current[i] ?? createRef<ItemHandles>());
    }, []);

    const handleItemClick = (
        index: number,
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => {
        itemRefs.current[index]?.current?.openModal(
            id,
            title,
            amount,
            onAmountChange
        );
    };

    return (
        <section className="products">
            <Parent
                data={Data}
                onItemClicked={handleItemClick}
                itemRefs={itemRefs.current}
            />
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (
        index: number,
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
    itemRefs: React.RefObject<ItemHandles>[];
}

function Parent({ data, onItemClicked, itemRefs }: ParentProps) {
    return (
        <List>
            {data.map((item, index) => (
                <Item
                    key={index}
                    data={item}
                    onItemClicked={onItemClicked}
                    index={index}
                    ref={itemRefs[index]}
                />
            ))}
        </List>
    );
}

interface ListProps {
    children: React.ReactNode;
}

function List({ children }: ListProps) {
    return <ul>{children}</ul>;
}

interface ItemProps {
    data: DataProps;
    onItemClicked: (
        index: number,
        id: number,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
    index: number;
}

const Item = forwardRef<ItemHandles, ItemProps>(
    ({ data, onItemClicked, index }, ref) => {
        const [currentAmount, setCurrentAmount] = useState<number>(data.amount);
        const [isModalVisible, setModalVisible] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            openModal: (id, title, amount, onAmountChange) => {
                setCurrentAmount(amount);
                setModalVisible(true);
            },
        }));

        const handleClick = () => {
            onItemClicked(
                index,
                data.id,
                data.title,
                currentAmount,
                setCurrentAmount
            );
        };

        const handleCloseModal = () => {
            setModalVisible(false);
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
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                />
                <button onClick={handleClick}>button</button>
                {isModalVisible && (
                    <div className="modal">
                        <div className="modal-container">
                            <h3>Modal</h3>
                            <h4>id: {data.id}</h4>
                            <h4>title: {data.title}</h4>
                            <p>amount: {currentAmount}</p>
                            <input
                                type="number"
                                value={currentAmount}
                                onChange={(e) =>
                                    setCurrentAmount(Number(e.target.value))
                                }
                            />
                            <button onClick={handleCloseModal}>close</button>
                        </div>
                    </div>
                )}
            </li>
        );
    }
);
