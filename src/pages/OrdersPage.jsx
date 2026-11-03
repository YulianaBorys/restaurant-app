import { Link, useSearchParams } from 'react-router-dom';
import { useOrders } from '../context/orderContext.js';
import PageHeading from '../components/ui/PageHeading.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import Loader from '../components/ui/Loader.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';

export default function OrdersPage({ dishes = [] }) {
  const { orders, isLoading, error, fetchOrders, deleteOrder } = useOrders();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  // Відфільтрований список
  const filteredOrders = orders.filter((order) => {
    const searchQuery = query.toLowerCase().trim();
    const dish = dishes.find((d) => d.id === order.dishId);
    const dishName = dish ? dish.name.toLowerCase() : '';
    
    return (
      !searchQuery ||
      order.id?.toLowerCase().includes(searchQuery) ||
      dishName.includes(searchQuery) ||
      order.comment?.toLowerCase().includes(searchQuery)
    );
  });

  // 1. Стан ЗАВАНТАЖЕННЯ (Loading)
  if (isLoading) {
    return <Loader message="Завантажуємо список замовлень..." />;
  }

  // 2. Стан ПОМИЛКИ (Error)
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchOrders} />;
  }

  // 3. Стан ПОРОЖНЬОЇ КОЛЕКЦІЇ (Empty Collection)
  if (orders.length === 0) {
    return (
      <EmptyState title="У системі ще немає жодного замовлення">
        <p>Створіть перше замовлення з каталогу меню.</p>
        <Link to="/menu" className="app-button app-button-primary">
          Перейти до меню
        </Link>
      </EmptyState>
    );
  }

  // 4. Стан ВІДСУТНОСТІ ЗБІГІВ (No Matches)
  if (filteredOrders.length === 0) {
    return (
      <EmptyState title="За вашим запитом замовлень не знайдено">
        <p>Спробуйте змінити пошуковий запит або скинути фільтри.</p>
        <AppButton variant="secondary" onClick={() => setSearchParams({}, { replace: true })}>
          Скинути фільтри
        </AppButton>
      </EmptyState>
    );
  }

  // Обробник видалення (з модальним підтвердженням)
  const handleDelete = async (id) => {
    if (window.confirm(`Ви дійсно бажаєте видалити замовлення #${id}?`)) {
      try {
        await deleteOrder(id);
      } catch (err) {
        alert(`Помилка видалення: ${err.message}`);
      }
    }
  };

  // 5. Стан УСПІХУ (Success) — ВАШ КОД З НЕВЕЛИКИМИ ВИПРАВЛЕННЯМИ
  return (
    <div className="orders-page">
      <PageHeading title="Список замовлень" />

      <ul className="orders-list">
        {filteredOrders.map((order) => {
          const dish = dishes.find((d) => d.id === order.dishId);

          return (
            <li key={order.id}>
              <h3>Замовлення #{order.id}</h3>
              <p>
                <strong>Страва: </strong>
                {dish ? dish.name : 'Невідома страва'}
              </p>
              <p>
                <strong>Коментар: </strong>
                {order.comment || order.purpose || 'Без коментаря'}
              </p>
              <p>
                <strong>Прибори: </strong>
                {order.needsCutlery || order.needsHelp ? 'Потрібні' : 'Не потрібні'}
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link
                  to={`/orders/${order.id}/edit`}
                  className="app-button app-button-secondary"
                >
                  Редагувати замовлення
                </Link>
                <AppButton
                  variant="secondary"
                  onClick={() => handleDelete(order.id)}
                >
                  Видалити
                </AppButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}