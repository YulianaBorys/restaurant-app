import {Link} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'

export default function OrdersPage({orders=[], dishes=[]}){
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
                        </div>
                    </li>
                    )
                })}
                </ul>
            </div>
    )
}