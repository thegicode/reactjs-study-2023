interface ModalProps {
    item?: Item;
    onChange: (id: number, amount: string) => void;
}

function Modal({ item, onChange }: ModalProps) {
    if (!item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isNaN(Number(newValue))) {
            onChange(item.id, newValue);
        }
    };

    return (
        <div className="modal">
            <h2>{item.name}</h2>
            <input
                type="number"
                defaultValue={item.amount}
                onChange={handleChange}
            />
        </div>
    );
}

export default Modal;
