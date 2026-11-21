import DishCard from "./DishCard"
import EmptyState from "../ui/EmptyState";

export default function Menu({ items=[] }) {
     if (!items || items.length === 0) {
            return (<EmptyState message="На жаль, наразі немає доступних страв." />);
        } 
            return(
                <ul className="dishes-grid">
                    {items.map((item) => (
                        <li key={item.id} className="dish-item">
                            <DishCard item={item} />
                        </li>
                    ))}
                </ul>
            )
}
