import EmptyState from "./ui/EmptyState";
import DishCard from "../components/dishes/DishCard"

export default function MenuList({ items = [], selectedId, onSelect, emptyTitle }) {
    if (items.length === 0) {
        return <EmptyState title={emptyTitle || "Наразі немає доступних страв."} />;
    }

    return (
        <div className="menu-list">
            {items.map((item) => (
                <DishCard
                    key={item.id}
                    dish={item}
                    selected={selectedId === item.id}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
