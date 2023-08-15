import { memo } from "react";
import ProductItem from "./ProductItem";

const data: Product[] = [
    { id: 1, name: "name", title: "Product a", amount: 11 },
    { id: 2, name: "name", title: "Product b", amount: 22 },
    { id: 3, name: "name", title: "Product c", amount: 33 },
    { id: 4, name: "name", title: "Product d", amount: 44 },
    { id: 5, name: "name", title: "Product e", amount: 55 },
];

const ProductList = () => {
    console.log("ProductList");
    return (
        <ul>
            {data.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </ul>
    );
};

export default memo(ProductList);
