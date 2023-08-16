import React from "react";
import ProductItem from "./ProductItem";

interface ProductListProps {
    items: Item[];
    refs: React.RefObject<any>[];
    setSelectedItemId: (id: number | null) => void;
}

function ProductList({ items, refs, setSelectedItemId }: ProductListProps) {
    return (
        <ul>
            {items.map((item, index) => (
                <ProductItem
                    key={item.id}
                    ref={refs[index]}
                    item={item}
                    onClick={() => setSelectedItemId(item.id)}
                />
            ))}
        </ul>
    );
}

export default ProductList;
