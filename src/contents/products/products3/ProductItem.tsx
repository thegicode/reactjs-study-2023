import React, { useState, forwardRef, useImperativeHandle } from "react";

interface ProductItemProps {
    item: Item;
    onClick: () => void;
}

const ProductItem = forwardRef((props: ProductItemProps, ref) => {
    const { item, onClick } = props;
    const [value, setValue] = useState<number>(parseInt(item.amount) || 0);

    const handleIncrement = () => setValue((prevValue) => prevValue + 1);
    const handleDecrement = () => setValue((prevValue) => prevValue - 1);

    useImperativeHandle(ref, () => ({
        setValue: (newValue: string) => {
            setValue(parseInt(newValue));
        },
    }));

    return (
        <li>
            {item.name}
            <button onClick={handleDecrement}>-</button>
            <input value={value.toString()} readOnly onClick={onClick} />
            <button onClick={handleIncrement}>+</button>
        </li>
    );
});

export default ProductItem;
