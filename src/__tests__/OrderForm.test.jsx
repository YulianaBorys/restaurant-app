import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import OrderForm from '../components/orders/OrderForm.jsx';

describe('OrderForm (взаємодія з формою та збереження введення)', () => {
  it('показує помилки валідації при порожній відправці та не викликає onSubmitSuccess', async () => {
    const user = userEvent.setup();
    const handleSuccess = vi.fn();

    render(<OrderForm onSubmitSuccess={handleSuccess} onCancel={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /зберегти/i }));

    expect(screen.getByText("Ім'я клієнта є обов'язковим")).toBeInTheDocument();
    expect(screen.getByText("Номер телефону є обов'язковим")).toBeInTheDocument();
    expect(screen.getByText('Адреса є обов\'язковою')).toBeInTheDocument();
    expect(handleSuccess).not.toHaveBeenCalled();
  });

  it('зберігає введені дані при збої сервера та показує повідомлення про помилку', async () => {
    const user = userEvent.setup();
    const handleFailure = vi.fn().mockRejectedValue(new Error('Сервер тимчасово недоступний'));

    render(<OrderForm onSubmitSuccess={handleFailure} onCancel={vi.fn()} />);

    const nameInput = screen.getByLabelText(/ім'я клієнта/i);
    const phoneInput = screen.getByLabelText(/телефон клієнта/i);
    const addressInput = screen.getByLabelText(/адреса доставки/i);

    await user.type(nameInput, 'Тарас Шевченко');
    await user.type(phoneInput, '+380671112233');
    await user.type(addressInput, 'вул. Незалежності, 10');

    await user.click(screen.getByRole('button', { name: /зберегти/i }));

    expect(await screen.findByText(/Сервер тимчасово недоступний/i)).toBeInTheDocument();
    // Перевіряємо, що введені дані не втрачені
    expect(nameInput).toHaveValue('Тарас Шевченко');
    expect(phoneInput).toHaveValue('+380671112233');
    expect(addressInput).toHaveValue('вул. Незалежності, 10');
  });
});