import "../../../css/products.css";
import React, { useState, useRef, createRef } from "react";
import ProductList from "./ProductList";
import Modal from "../../../components/Modal3";

const initialItems: Item[] = [
    { id: 1, name: "Item 1", amount: "" },
    { id: 2, name: "Item 2", amount: "" },
    // ... more items
];

function App() {
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const itemRefs = useRef<(React.RefObject<any> | null)[]>([]);

    itemRefs.current = initialItems.map(
        (_, i) => itemRefs.current[i] ?? createRef()
    );

    const handleModalChange = (id: number, amount: string) => {
        const itemRef = itemRefs.current[id];
        if (itemRef && itemRef.current) {
            itemRef.current.setValue(amount);
        }
    };

    return (
        <div>
            {/* <ProductList
                items={initialItems}
                refs={itemRefs}
                setSelectedItemId={setSelectedItemId}
            />
            {selectedItemId !== null && (
                <Modal
                    item={initialItems.find((i) => i.id === selectedItemId)}
                    onChange={handleModalChange}
                />
            )} */}
        </div>
    );
}

export default App;
