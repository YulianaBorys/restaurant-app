import {mockOrderService} from './mockOrderService.js'
import {apiOrderService} from './apiOrderService.js'

// Зчитуємо прапорець із змінних середовища Vite
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

// Вибираємо реалізацію в одному місці
export const orderService = useMock ? mockOrderService : apiOrderService;