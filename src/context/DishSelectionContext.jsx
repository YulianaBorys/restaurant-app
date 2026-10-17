import {useState} from "react";
import {MENU_ITEMS} from "../data/restaurantData";
import DishSelectionContext from "./dishSelectionContext";

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
