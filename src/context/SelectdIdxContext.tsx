import { createContext } from "react";

interface SelectedItemContextType {
    selectedItem: Product | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<Product | null>>;
}
export const SelectedItemContext =
    createContext<SelectedItemContextType | null>(null);
