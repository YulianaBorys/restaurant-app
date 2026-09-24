
export default function MenuList({ items }) {
    return (
        <div className="menu-list">
            {items.map((item) => (
                <div key={item.id} className="menu-item">
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                    <div className="menu-item-details">
                        <h3 className="menu-item-name">{item.name}</h3>
                        <p className="menu-item-description">{item.description}</p>
                        <p className="menu-item-price">{item.price} грн</p>
                    </div>  
                </div>
            ))}
        </div>
    );
}

