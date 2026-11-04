import { useState, useEffect, useCallback } from 'react';
import { OrderContext } from './orderContext.js';
import { orderService } from '../services/index.js';

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]=useState(null)

    const fetchOrders = useCallback( async () => {
        setIsLoading(true);
        setError(null)

        let isCurrent=true;

        try {
            const data = await orderService.getAll();
            if(isCurrent){
                setOrders(data);
            }
        } catch (err) {
            if(isCurrent){
                setError(err.message || 'Помилка завантаження');
            }
        } finally {
            if(isCurrent){
                setIsLoading(false);
            }
        }

        return()=>{
            isCurrent=false;
        }
    },[]);

    useEffect(() => {
        let cleanup
        fetchOrders().then((cleanupFn)=>{
            cleanup=cleanupFn
        })

        return () => {
            if(typeof cleanup==='function') cleanup()
        }
    }, [fetchOrders]);

    const addOrder = async (newOrderData) => {
        const created = await orderService.create(newOrderData);
        await fetchOrders()
        return created;
    };

    const updateOrder = async (id, updateData) => {
        const updated = await orderService.update(id, updateData);
        await fetchOrders()
        return updated;
    };

    const deleteOrder = async (id) => {
        await orderService.delete(id);
        await fetchOrders()
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                isLoading,
                error,
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