import "../css/modal.css";

import { useContext } from "react";
import { SelectedItemContext } from "../context/SelectdItemContext";

// interface ModalContextProps {
//     product: Product | null;
// }

// export default function ModalContext({ product, setSelectedItem }: ModalProps) {
export default function ModalContext() {
    console.log("ModalContext");
    const contextValue = useContext(SelectedItemContext);

    if (contextValue === null) {
        throw new Error("SelectedItemContext not provided");
    }

    const { selectedItem, setSelectedItem } = contextValue;
    if (selectedItem === null) {
        return null;
    }

    const { id, title, amount } = selectedItem;

    return (
        <section className="modal">
            <div className="modal-container">
                <h2>
                    {id}: {title}
                </h2>
                <p>{amount}</p>
                <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
        </section>
    );
}
