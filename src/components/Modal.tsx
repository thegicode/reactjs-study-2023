export default function Modal({ product, setSelectedItem }: ModalProps) {
    if (!product) return null;

    return (
        <div className="modal">
            <h2>{product.title}</h2>
            <p>{product.amount}</p>
            <button onClick={() => setSelectedItem(null)}>Close</button>
        </div>
    );
}
