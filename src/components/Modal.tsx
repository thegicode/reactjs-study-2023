import "../css/modal.css";

export default function Modal({ product, setSelectedItem }: ModalProps) {
    if (!product) return null;

    return (
        <section className="modal">
            <div className="modal-container">
                <h2>{product.title}</h2>
                <p>{product.amount}</p>
                <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
        </section>
    );
}
