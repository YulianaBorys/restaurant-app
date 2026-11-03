import { useState, useEffect } from 'react';
import { OrderContext } from './orderContext.js';
import { mockOrderService } from '../services/mockOrderService.js';
import { orderService } from '../services/index.js';

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await mockOrderService.getAll();
            setOrders(data);
        } catch (err) {
            console.error('Помилка завантаження: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            void fetchOrders();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const addOrder = async (newOrderData) => {
        const created = await orderService.create(newOrderData);
        setOrders((prev) => [created, ...prev]);
        return created.id;
    };

    const updateOrder = async (id, updateData) => {
        const updated = await orderService.update(id, updateData);
        setOrders((prevOrders) =>
            prevOrders.map((ord) => (ord.id === id ? updated : ord))
        );
        return updated;
    };

    const deleteOrder = async (id) => {
        await orderService.delete(id);
        setOrders((prevOrders) => prevOrders.filter((ord) => ord.id !== id));
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                isLoading,
                fetchOrders,
                addOrder,
                updateOrder,
                deleteOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}