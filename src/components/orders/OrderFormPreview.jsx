import FormField from '../ui/FormField'
import AppButton from '../ui/AppButton'

export default function OrderFormPreview(){
    return(
        <form className='order-form-preview' onSubmit={(e)=>e.preventDefault()}>
            <FormField id='client-name' label="Ваше ім'я">
                <input type='text' id='client-name' required/>
            </FormField>

            <FormField id='client-phone' label="Ваш номер телефону">
                <input type="tel" id='client-phone' required/>
            </FormField>

            <FormField id='client-address' label='Адреса доставки'>
                <input type='text' id='client-address' required/>
            </FormField>

            <FormField id='dish-quantity' label="Кількість порцій">
                <input type='number' id='dish-quantity' required/>
            </FormField>
        
            <AppButton type='submit' variant='primary'>
                Підтвердити замовлення
            </AppButton>
        </form>
    )
}