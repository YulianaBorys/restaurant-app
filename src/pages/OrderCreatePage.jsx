import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import Section from '../components/ui/Section'
import useDishSelection from '../hooks/useDishSelection'
import OrderPage from './OrderPage'
import NotFoundPage from './NotFoundPage'
import EmptyState from '../components/ui/EmptyState'

export default function OrderCreatePage({dishes}){
    const [searchParams]=useSearchParams()
    const navigate=useNavigate()
    const {selectedId, selectedDish, clearSelection}=useDishSelection()

    const dishId=searchParams.get('dishId')
    const EFdishId=dishId || selectedId

    if(!EFdishId){
        return(
            <div className="order-create-empty">
                <PageHeading title="Створення замовлення"/>
                <EmptyState title="Страва ще не обрана">
                    <h5>Спочатку оберіть страви з меню</h5>
                    <div>
                        <Link to="/menu" className="app-button app-button-primary">
                        Відкрити меню
                        </Link> 
                    </div>
                </EmptyState>
            </div>
        )
    }

    const dish=dishes.find((entry)=>entry.id===EFdishId) || selectedDish

    if(!dish){
        return(
            <NotFoundPage
            title="404: Страва не знайдена"
            message="Зазначену страву не знайдено у меню"
            />
        )
    }

    function handleCancel(){
        clearSelection()
        navigate('/menu', {replace: true})
    }

    return(
        <OrderPage
        key={`new-${dish.id}`}
        dish={dish}
        onCancel={handleCancel}
        />
    )
}