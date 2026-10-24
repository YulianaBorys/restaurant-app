import {Link} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import {useOrders} from '../context/orderContext.js'

export default function OrdersPage({dishes=[]}){
    const {orders}=useOrders()

    if(orders.length===0){
        return(
            <div className="orders-page">
                <PageHeading title="Список замовлень"/>
                <p>Наразі немає збережених замовлень</p>
                <Link to="/menu" className="app-button app-button-primary">
                    Перейти до меню
                </Link>
            </div>
        )
    }

    return(
        <div className="orders-page">
            <PageHeading title="Список замовлень"/>
            <ul className="orders-list">
                {orders.map((order)=>{
                    const dish=dishes.find((dish)=>dish.id===order.dishId)
                    const needsCutlery=order.needsCutlery ?? order.needsHelp

                    return(
                        <li key={order.id}>
                            <h3>Замовлення #{order.id}</h3>
                            {order.clientName && <p><strong>Клієнт:</strong> {order.clientName}</p>}
                            {order.clientPhone && <p><strong>Телефон:</strong> {order.clientPhone}</p>}
                            {order.clientAddress && <p><strong>Адреса:</strong> {order.clientAddress}</p>}
                            {order.dishId != null && <p><strong>Страва:</strong> {dish ? dish.name : "Невідома страва"}</p>}
                            {order.quantity != null && <p><strong>Кількість порцій:</strong> {order.quantity}</p>}
                            <p>
                                <strong>Коментар:</strong> {order.comment || order.purpose || "Без коментаря"}
                            </p>
                            <p>
                                <strong>Прибори:</strong>{' '}
                                {needsCutlery ? "Потрібні":"Не потрібні"}
                            </p>

                            <div>
                            <Link to={`/order/${order.id}/edit`}
                            className='app-button app-button-secondary'>
                                Редагувати замовлення
                            </Link>
                        </div>
                    </li>
                    )
                })}
                </ul>
            </div>
    )
}