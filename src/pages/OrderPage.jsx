import Section from '../components/ui/Section'
import DishCard from '../components/dishes/DishCard'
import OrderFormPreview from '../components/orders/OrderFormPreview'
import {MENU_ITEMS} from '../data/restaurantData'

export default function OrderPage(){
    const selectedDish = MENU_ITEMS && MENU_ITEMS.length > 0 ? MENU_ITEMS[0] : null;

    return(
        <Section id='order-page' title='Підготовка замовлень'>
            <div className='order-page-grid'>
                <div className="selected-page-preview">
                    <h3>Обрана страва:</h3>
                    {selectedDish ? (
                        <DishCard dish={selectedDish}/>
                    ): (
                        <p>Страва не обрана</p>
                    )}
                </div>
                <OrderFormPreview dishName={selectedDish?.name}/>
            </div>
        </Section>
    )
}