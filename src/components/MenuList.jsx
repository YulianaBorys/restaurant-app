
import EmptyState from "./ui/EmptyState";

export default function MenuList({ items = [], emptyTitle }) {
    if (items.length === 0) {
        return <EmptyState title={emptyTitle || "Наразі немає доступних страв."} />;
    }

    return (
        <div className="menu-list">
            {items.map((item) => (
                <div key={item.id} className="menu-item">
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                    <div className="menu-item-details">
                        <h3 className="menu-item-name">{item.name}</h3>
                        <p className="menu-item-description">{item.description}</p>
                        {item.alergens && item.alergens.length > 0 && (
                            <p className="menu-item-alergens">Алергени: {item.alergens.join(", ")}</p>
                        )}
                        <p className="menu-item-price">{item.price} грн</p>
                    </div>  
                </div>
            ))}
        </div>
    );
}

