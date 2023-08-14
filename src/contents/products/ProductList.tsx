import ProductItem from "./ProductItem";

const data: Product[] = [
    { id: 1, name: "name", title: "Product 1", amount: 1 },
    { id: 2, name: "name", title: "Product 2", amount: 2 },
    { id: 3, name: "name", title: "Product 3", amount: 3 },
    { id: 4, name: "name", title: "Product 4", amount: 4 },
    { id: 5, name: "name", title: "Product 5", amount: 5 },
];

export default function ProductList({ setSelectedItem }: ProductListProps) {
    return (
        <ul>
            {data.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item}
                    setSelectedItem={setSelectedItem}
                />
            ))}
        </ul>
    );
}
