import { useNavigate, useParams } from "react-router-dom";
import OrderPage from "./OrderPage";
import NotFoundPage from "./NotFoundPage";

export default function OrderEditPage({orders, dishes}){
    const {orderId}=useParams()
    const navigate =useNavigate()

    const order=orders.find((entry)=>entry.id===orderId)

    if(!order){
        return(
            <NotFoundPage
            title="404: Замовлення не знайдено"
            message="Замовлення з таким індекатором відсутнє в системі"
            />
        )
    }

    const dish=dishes.find((entry)=>entry.id===order.dishId)

    if (!dish){
        return(
            <NotFoundPage
            title="404: Страва відсутня в меню"
            message="Страва з цього замовлення більше не відображається в меню"
            />
        )
    }

    const initialDraft={
        purpose: order.purpose?? '',
        needsHelp: order.needsHelp?? false,
    }

    return(
        <OrderPage
        key={`edit-${order.id}`}
        title={`Редагування замовлення ${order.id}`}
        dish={dish}
        initialDraft={initialDraft}
        onCancel={()=>navigate('/order')}
        cancelLabel="Вийти без збереження"
        />
    )
}