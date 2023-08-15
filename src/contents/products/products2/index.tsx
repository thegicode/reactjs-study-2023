import "../../../css/products.css";
import { useState } from "react";
import PorductList from "./ProductList";
import ModalContext from "../../../components/ModalContext";

import { SelectedItemContext } from "../../../context/SelectdIdxContext";

export default function ProuductsPage() {
    console.log("Index");

    const [selectedItem, setSelectedItem] = useState<Product | null>(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            <section className="products">
                <h1>Products</h1>
                <PorductList />
            </section>
            <ModalContext />
        </SelectedItemContext.Provider>
    );
}
