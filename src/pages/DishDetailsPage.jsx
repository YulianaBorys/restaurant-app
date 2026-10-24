import {Link, useNavigate, useParams} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import AppButton from '../components/ui/AppButton'
import AvailabilityBadge from '../components/dishes/AvailabilityBadge'
import useDishSelection from '../hooks/useDishSelection'
import NotFoundPage from './NotFoundPage'

export default function DishDetailsPage({dishes}){
    const {dishId}=useParams()
    const navigate=useNavigate()
    const {selectDish}=useDishSelection()

    const dish=dishes.find((entry)=>String(entry.id) === dishId)

    if(!dish){
        return(
            <NotFoundPage
            title="404: Страва не знайдена"
            message="Перевірте адресу або оберіть іншу страву з меню"
            />
        )
    }

    function handlePrepareOrder(){
        selectDish(dish.id)
        const search=new URLSearchParams({dishId: dish.id})
        navigate(`/order/new?${search}`)
    }

    return(
        <div className="dish-details-page">
            <PageHeading title={dish.name}/>
            <p className="category">Категорія: {dish.category}</p>
            <p className="description">{dish.description}</p>
            <p className="price">Ціна: {dish.price}</p>
            {dish.deliveryAvailable === false ? (
                <p className="delivery-note">Лише у закладі, без доставки</p>
            ) : (
                <p><AvailabilityBadge available={dish.available}/></p>
            )}
            <img src={dish.image} alt={dish.name} className="image"/>

            <div className="actions">
                {dish.deliveryAvailable !== false && (
                    <AppButton variant="primary" onClick={handlePrepareOrder}>
                        Вибрати й підготувати замовлення
                    </AppButton>
                )}
                <Link to="/menu" className="app-button app-button-secondary">
                До каталогу
                </Link>
            </div>
        </div>
    )
}
