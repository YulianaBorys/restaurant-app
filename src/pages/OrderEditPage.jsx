import {useNavigate, useParams} from 'react-router-dom'
import OrderForm from '../components/orders/OrderForm'
import PageHeading from '../components/ui/PageHeading'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import NotFoundPage from './NotFoundPage'
import {useOrders} from '../context/orderContext.js'

export default function OrderEditPage(){
    const {orderId}=useParams()
    const navigate =useNavigate()
    const {orders, isLoading, updateOrder}=useOrders()

    if(isLoading){
        return <LoadingSpinner message="Завантаження даних замовлення..." />
    }

    const order=orders.find((entry)=>entry.id===orderId)

    if(!order){
        return(
            <NotFoundPage
            title="404: Замовлення не знайдено"
            message="Замовлення з таким ідентифікатором відсутнє в системі"
            />
        )
    }

    async function handleSubmitSuccess(formData){
        await updateOrder(order.id, formData)
        navigate('/order', {
            replace: true,
            state: {flashMessage: `Замовлення ${order.id} успішно оновлено!`},
        })
    }

    const initialValues={
        clientName: order.clientName ?? '',
        clientPhone: order.clientPhone ?? '',
        clientAddress: order.clientAddress ?? '',
        quantity: order.quantity ?? 1,
        comment: order.comment ?? order.purpose ?? '',
        needsCutlery: order.needsCutlery ?? order.needsHelp ?? false,
    }

    return(
        <div className="order-edit-page">
            <PageHeading title={`Редагування замовлення ${order.id}`} />
            <OrderForm
                key={`edit-${order.id}`}
                initialValues={initialValues}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={()=>navigate('/order')}
                submitLabel="Зберегти зміни"
            />
        </div>
    )
}