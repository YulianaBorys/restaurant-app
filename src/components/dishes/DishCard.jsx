import AvailabilityBadge from "./AvailabilityBadge";
import {useState} from "react";
import AppButton from "../ui/AppButton";

export default function DishCard({ dish, selected, onSelect }) {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const descriptionId = `dish-description-${dish.id}-description`;

    return (
        <article className="dish-card">
            <h3>{dish.name}</h3>
            <p>Категорія: {dish.category}</p>
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <p>Ціна: {dish.price} грн</p>
            <AvailabilityBadge available={dish.available} />

            <AppButton 
            variant="secondary"
             onClick={() => setDetailsOpen(previous => !previous)} 
             aria-expanded={detailsOpen} 
             aria-controls={descriptionId}>
                {detailsOpen ? "Приховати склад" : "Показати склад"}
            </AppButton>

            <p id={descriptionId} hidden={!detailsOpen} className="description">
                {dish.description}
            </p>
            <p hidden={!detailsOpen}>Алергени: {dish.alergens.join(", ")}</p>

            <p>
                <AppButton 
                onClick={() => onSelect(dish.id)} 
                aria-pressed={selected}>
                    Вибрано "{dish.name}"
                </AppButton>
            </p>

            {selected && <p className="selected-message">Ця страва вибрана</p>}
        </article>
    );
}
