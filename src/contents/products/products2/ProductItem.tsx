import { useContext } from "react";
import { SelectedItemContext } from "../../../context/SelectdIdxContext";

const ProductItem = ({ product }: ProductItemProps2) => {
    console.log("ProductItem", product.id);

    const contextValue = useContext(SelectedItemContext);
    if (contextValue === null) {
        throw new Error("SelectedItemContext not provided");
    }

    const { setSelectedItem } = contextValue;
    if (!setSelectedItem) {
        // Here you could handle the case where setSelectedItem is not defined
        return null;
    }

    const { id, title, amount } = product;
    return (
        <li onClick={() => setSelectedItem(product)}>
            <p className="id">ID: {id}</p>
            <p className="title">Title: {title}</p>
            <p className="amount">Amount: {amount}</p>
            {/* <input type="text" value={amount} readOnly /> */}
        </li>
    );
};
export default ProductItem;
