import AvailabilityBadge from "./AvailabilityBadge";

export default function DishCard({ dish }) {
    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p>Категорія: {dish.category}</p>
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <p>{dish.description}</p>
            <p>Ціна: {dish.price} грн</p>
            <AvailabilityBadge available={dish.available} />
        </div>
    );
}
