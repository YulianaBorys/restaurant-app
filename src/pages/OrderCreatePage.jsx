import {useNavigate} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import useDishSelection from '../hooks/useDishSelection'
import OrderForm from '../components/orders/OrderForm'
import {useOrders} from '../context/orderContext.js'

export default function OrderCreatePage(){
    
    const navigate=useNavigate()
    const {clearSelection}=useDishSelection()
    const {addOrder}= useOrders()

    async function handleSubmitSuccess(formData){
        const createdOrder=await addOrder(formData)
        clearSelection()
        navigate('/order', {
            replace: true,
            state: {flashMessage: `Замовлення ${createdOrder.id} успішно створено!`},
        })
    }

    function handleCancel(){
        clearSelection()
        navigate('/menu', {replace: true})
    }

    return(
        <div className="order-create-page">
        <PageHeading title="Створення нового замовлення" />
        <OrderForm
        submitLabel="Створити замовлення"
        initialValues={{
            clientName: '', 
            clientPhone: '', 
            clientAddress: '', 
            comment: '', 
            quantity: 1, 
            needsCutlery: false,}}
        onSubmitSuccess={handleSubmitSuccess}
        onCancel={handleCancel}
        />
        </div>
    )
}