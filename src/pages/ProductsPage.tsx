import "../css/products.css";
import { useState } from "react";
import PorductList from "../contents/products/ProductList";

import Modal from "../components/Modal";

export default function ProuductsPage() {
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);

    return (
        <section className="productsPage">
            <h1>Products</h1>
            <PorductList setSelectedItem={setSelectedItem} />
            <Modal product={selectedItem} setSelectedItem={setSelectedItem} />
        </section>
    );
}
