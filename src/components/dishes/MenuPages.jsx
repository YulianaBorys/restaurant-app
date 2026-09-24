import restaurantData from "../../data/restaurantData.json";
import MenuSummary from "./MenuSumary";
import MenuList from "../MenuList";

export default function MenuPages() {
    const menuItems = restaurantData.menuItems;
    const totalPrice = menuItems.reduce((total, item) => total + item.price, 0);
    return (
        <div className="menu-page">
            <h2>Меню</h2>
            <MenuList items={menuItems} />
            <MenuSummary total={totalPrice} />
        </div>
    );
}
