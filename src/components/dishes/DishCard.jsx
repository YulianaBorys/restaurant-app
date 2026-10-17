import AvailabilityBadge from "./AvailabilityBadge";
import {useState} from "react";
import AppButton from "../ui/AppButton";
import {Link} from 'react-router-dom';

export default function DishCard({ dish, selected, onSelect }) {
    const [detailsOpen, setDetailsOpen]=useState(false)
    const descriptionId=`dish-description-${dish.id}`

    return (
        <article className={`dish-card ${selected? 'selected': ''}`}>
            <h3>
                <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
            </h3>
            <p className="category">Категорія: {dish.category}</p>
            <img src={dish.image} alt={dish.name} className="image" />
            <p className="price">Ціна: {dish.price} грн</p>
            <p><AvailabilityBadge available={dish.available} /></p>

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
                <p hidden={!detailsOpen}>Алергени: {(dish.allergens ?? []).join(", ") || "Немає"}</p>

                {onSelect && (
                    <AppButton 
                    onClick={() => onSelect(dish.id)} >
                    
                {selected? "Ця страва вибрана": "Обрати страву"}
            </AppButton>
            )}
        </article>
    )
}
