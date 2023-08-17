import "../../css/modal.css";
import "../../css/products.css";

import { useState } from "react";

interface Product1 {
    id: number;
    title: string;
    amount: number;
}

interface ProductListProps1 {
    setSelectedItem: (product: Product1 | null) => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    controlItem: Product1 | null;
    setControlItem: React.Dispatch<React.SetStateAction<Product1 | null>>;
}

interface ProductItemProps1 {
    product: Product1;
    setSelectedItem: (product: Product1 | null) => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    controlItem: Product1 | null;
    setControlItem: React.Dispatch<React.SetStateAction<Product1 | null>>;
}

interface ModalProps1 {
    product: Product1 | null;
    // setSelectedItem: (product: Product | null) => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    controlItem: Product1 | null;
    setControlItem: React.Dispatch<React.SetStateAction<Product1 | null>>;
}

const data: Product[] = [
    { id: 1, title: "Product a", amount: 11 },
    { id: 2, title: "Product b", amount: 22 },
    { id: 3, title: "Product c", amount: 33 },
    { id: 4, title: "Product d", amount: 44 },
    { id: 5, title: "Product e", amount: 55 },
];

export default function Prouducts1() {
    console.log("render index");

    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [isShowModal, setShowModal] = useState<boolean>(false);
    const [controlItem, setControlItem] = useState<Product1 | null>(null);

    return (
        <section className="products">
            <h1>Products</h1>
            <ProductList
                setSelectedItem={setSelectedItem}
                setShowModal={setShowModal}
                controlItem={controlItem}
                setControlItem={setControlItem}
            />

            {isShowModal && (
                <Modal
                    product={selectedItem}
                    setShowModal={setShowModal}
                    controlItem={controlItem}
                    setControlItem={setControlItem}
                />
            )}
        </section>
    );
}

function ProductList({
    setSelectedItem,
    setShowModal,
    controlItem,
    setControlItem,
}: ProductListProps1) {
    console.log("render ProductList");
    return (
        <ul>
            {data.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item}
                    setSelectedItem={setSelectedItem}
                    setShowModal={setShowModal}
                    controlItem={controlItem}
                    setControlItem={setControlItem}
                />
            ))}
        </ul>
    );
}

function ProductItem({
    product,
    setSelectedItem,
    setShowModal,
    controlItem,
    setControlItem,
}: ProductItemProps1) {
    console.log("render ProductItem", product.id);

    const { id, title, amount } = product;
    const [chagedAmount, setChangedAmount] = useState<number>(amount);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangedAmount(parseInt(event.target.value));
    };

    const handleClick = () => {
        setSelectedItem(product);
        setShowModal(true);
        setControlItem({
            id,
            title,
            amount: chagedAmount,
        });
    };

    return (
        <li>
            <p className="id">{id}</p>
            <p className="title">{title}</p>
            <p className="amount">amount: {chagedAmount}</p>
            <input type="number" value={chagedAmount} onChange={handleChange} />
            <button onClick={handleClick}>button</button>
        </li>
    );
}

function Modal({
    product,
    setShowModal,
    controlItem,
    setControlItem,
}: ModalProps1) {
    const [chagedAmount, setChangedAmount] = useState<number>(
        controlItem ? controlItem.amount : 0
    );

    if (!product) return null;
    if (!controlItem) return null;

    const { id, title, amount } = controlItem;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangedAmount(parseInt(event.target.value));
    };

    const onClose = () => {
        setShowModal(false);
        setControlItem({
            id,
            title,
            amount: chagedAmount,
        });
    };

    return (
        <section className="modal">
            <div className="modal-container">
                <h2>
                    {id} {title}
                </h2>
                <p>amount: {chagedAmount}</p>
                <input
                    type="number"
                    value={chagedAmount}
                    onChange={handleChange}
                />

                <button onClick={onClose}>Close</button>

                {/* <button onClick={() => setSelectedItem(null)}>Close</button> */}
            </div>
        </section>
    );
}
