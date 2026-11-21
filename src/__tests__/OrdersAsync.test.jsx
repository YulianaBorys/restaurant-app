import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderProvider } from '../context/OrderContext.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import { orderService } from '../services/index.js';

const mockDishes = [
  { id: 'dish-001', name: 'Піца Маргарита' },
];

function renderOrdersPage() {
  return render(
    <MemoryRouter initialEntries={['/order']}>
      <OrderProvider>
        <OrdersPage dishes={mockDishes} />
      </OrderProvider>
    </MemoryRouter>
  );
}

describe('OrdersPage + OrderProvider (підміна сервісу для 4 станів)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('1. Очікування (Loading): показує індикатор завантаження під час запиту', () => {
    vi.spyOn(orderService, 'getAll').mockImplementation(() => new Promise(() => {}));

    renderOrdersPage();

    expect(screen.getByText(/Завантажуємо список замовлень/i)).toBeInTheDocument();
  });

  it('2. Успіх (Success): відображає список отриманих замовлень', async () => {
    vi.spyOn(orderService, 'getAll').mockResolvedValue([
      {
        id: 'ord-101',
        dishId: 'dish-001',
        comment: 'Гарячою',
        needsCutlery: true,
      },
    ]);

    renderOrdersPage();

    expect(await screen.findByText(/Замовлення #ord-101/i)).toBeInTheDocument();
    expect(screen.getByText(/Піца Маргарита/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарячою/i)).toBeInTheDocument();
  });

  it('3. Порожня колекція (Empty): показує EmptyState, якщо замовлень немає', async () => {
    vi.spyOn(orderService, 'getAll').mockResolvedValue([]);

    renderOrdersPage();

    expect(
      await screen.findByText(/У системі ще немає жодного замовлення/i)
    ).toBeInTheDocument();
  });

  it('4. Відмова (Error): показує повідомлення про помилку при збої сервісу', async () => {
    vi.spyOn(orderService, 'getAll').mockRejectedValue(
      new Error('Помилка зʼєднання з API')
    );

    renderOrdersPage();

    expect(
      await screen.findByText(/Помилка зʼєднання з API/i)
    ).toBeInTheDocument();
  });
});