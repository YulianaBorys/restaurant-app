import { describe, it, expect } from 'vitest';
import validateOrderForm from '../utils/validation.js';

describe('validateOrderForm (предметні правила замовлення)', () => {
  const validForm = {
    clientName: 'Олена Ковальчук',
    clientPhone: '+380971234567',
    clientAddress: 'вул. Шевченка, 12, кв. 4',
    quantity: 2,
    comment: 'Без цибулі',
  };

  it('повертає порожній обʼєкт помилок для коректних даних', () => {
    expect(validateOrderForm(validForm)).toEqual({});
  });

  it('перевіряє обовʼязкові поля та мінімальну довжину імені й адреси', () => {
    const errors = validateOrderForm({
      clientName: 'А',
      clientPhone: '',
      clientAddress: 'вул',
      quantity: 1,
      comment: '',
    });

    expect(errors.clientName).toBe("Ім'я повинне містити щонайменше 2 символи");
    expect(errors.clientPhone).toBe('Номер телефону є обов\'язковим');
    expect(errors.clientAddress).toBe('Адреса занадто коротка (мінімум 5 символів)');
  });

  it('перевіряє формат українського номера телефону', () => {
    const errors = validateOrderForm({
      ...validForm,
      clientPhone: '12345',
    });
    expect(errors.clientPhone).toBe('Некоректний номер телефону');
  });

  it('перевіряє діапазон кількості порцій (1–10) та довжину коментаря (до 200)', () => {
    const errors = validateOrderForm({
      ...validForm,
      quantity: 15,
      comment: 'а'.repeat(201),
    });

    expect(errors.quantity).toBe('Мінімальна кількість порцій 1, максимальна - 10');
    expect(errors.comment).toBe('Задовгий коментар, максимальна довжина 200 символів');
  });
});