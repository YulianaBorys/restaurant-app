import {createContext, useContext, useState} from "react";
import {MENU_ITEMS} from "../data/restaurantData";

const DishSelectionContext = createContext();

export function DishSelectionProvider({children}) {
    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = MENU_ITEMS.find((item) => item.id === selectedId);

    function selectDish(id) {
        if (MENU_ITEMS.some((item) => item.id === id)) {
            setSelectedId(id);
        }
    }

    function clearSelection() {
        setSelectedId(null);
    }

    const value = {
        selectedId,
        selectedItem,
        selectDish,
        clearSelection,
    }

    return (
        <DishSelectionContext.Provider value={value}>
            {children}
        </DishSelectionContext.Provider>
    );
}

export function useDishSelection() {
    const context = useContext(DishSelectionContext);
    if (!context) {
        throw new Error("useDishSelection must be used within a DishSelectionProvider");
    }
    return context;
}