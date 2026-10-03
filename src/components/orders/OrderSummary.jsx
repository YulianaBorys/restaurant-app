export default function OrderSummary({ dishName, quantity, comment, needsCutlery }) {
    return (
        <div className="order-summary">
            <h3>Підтвердження замовлення</h3>
            <p><strong>Страва:</strong> {dishName}</p>
            <p><strong>Кількість:</strong> {quantity}</p>
            <p><strong>Коментар:</strong> {comment || 'Не вказано'}</p>
            <p><strong>Столові прибори:</strong> {needsCutlery ? 'Так' : 'Ні'}</p>
        </div>
    );
}