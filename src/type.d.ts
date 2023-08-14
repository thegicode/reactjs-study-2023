interface ModalProps {
    product: Product | null;
    setSelectedItem: (product: Product | null) => void;
}

interface ProductListProps {
    setSelectedItem: (product: Product | null) => void;
}

interface ProductItemProps {
    product: Product;
    setSelectedItem: (product: Product | null) => void;
}

interface Product {
    id: number;
    name: string;
    title: string;
    amount: number;
}
