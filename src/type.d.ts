interface ModalProps {
    product: Product | null;
    setSelectedItem: (product: Product | null) => void;
}

interface ModalContextProps {
    product: Product | null;
}

interface ProductListProps {
    setSelectedItem: (product: Product | null) => void;
}

interface ProductItemProps {
    product: Product;
    setSelectedItem: (product: Product | null) => void;
}

interface ProductItemProps2 {
    product: Product;
}

interface Product {
    id: number;
    name?: string;
    title: string;
    amount: number;
}
