import {Link, useSearchParams, useLocation} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import {useOrders} from '../context/orderContext.js'
import AppButton from '../components/ui/AppButton'
export default function OrdersPage({dishes=[]}){
    const {orders, deleteOrder}=useOrders()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    const query = searchParams.get('query') || ''
    const cutleryFilter = searchParams.get('cutlery') || 'all'
    const sortBy = searchParams.get('sort') || 'id'

    const flashMessage = location.state?.flashMessage

    function updateParam(key, value) {
        const newParams=new URLSearchParams(searchParams)
        if(value && value!=='all'){
            newParams.set(key,value)
        }else{
            newParams.delete(key)
        }
        setSearchParams(newParams, {replace: true})
    }

    function handleDelete(orderId) {
        const confirmed=window.confirm(`Ви впевнені, що хочете видалити замовлення ${orderId}?`)
        if(confirmed){
            deleteOrder(orderId)
        }
    }

    if(orders.length===0){
        return(
            <div className="orders-page">
                <PageHeading title="Список замовлень"/>
                <p>Наразі немає збережених замовлень</p>
                <Link to="/menu" className="app-button app=button-primary">
                    Перейти до меню
                </Link>
            </div>
        )
    }

    return(
        <div className="orders=page">
            <PageHeading title="Список замовлень"/>
            <ul className="orders-list">
                {orders.map((order)=>{
                    const dish=dishes.find((dish)=>dish.id===order.dishId)

                    return(
                        <li key={order.id}>
                            <h3>Замовлення #{order.id}</h3>
                            <p>
                                <strong>Страва:</strong>{dish?dish.name:"Невідома страва"}
                            </p>
                            <p>
                                <strong>Коментар:</strong>{order.purpose || "Без коментаря"}
                            </p>
                            <p>
                                <strong>Прибори:</strong>{' '}
                                {order.needsHelp? "Потрібні":"Не потрібні"}
                            </p>

                            <div>
                            <Link to={`/order/${order.id}/edit`}
                            className='app-button app-button-secondary'>
                                Редагувати замовлення
                            </Link>
                            <AppButton variant="secondary" onClick={()=>handleDelete(order.id)}>
                                Видалити
                            </AppButton>
                        </div>
                    </li>
                    )
                })}
                </ul>
            </div>
    )
}