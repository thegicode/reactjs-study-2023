export default function ProductItem({
    product,
    setSelectedItem,
}: ProductItemProps) {
    console.log("ProductItem", product.id);
    const { title, amount } = product;
    return (
        <li onClick={() => setSelectedItem(product)}>
            {/* {product.id} |  */}
            <p className="title">{title}</p>
            <p className="amount">amount: {amount}</p>
            {/* <input type="text" value={amount} readOnly /> */}
        </li>
    );
}
