import {orders as initialOrders} from '../data/orders.js';
import {useState} from 'react';
import OrderContext from './orderContext.js';

export function OrderProvider({children}){
    const [orders, setOrders]=useState(initialOrders);

    function addOrder(newOrderData){
        const newOrder={
            ...newOrderData, 
            id: `ord-${Date.now()}`, 
            createdAt: new Date().toISOString(),
        };
        setOrders(prev=>[newOrder, ...prev]);
        return newOrder.id;
    }

    function updateOrder(id, updateData){
       setOrders(prevOrders=> prevOrders.map(ord=>ord.id===id? {
        ...ord, ...updateData}:ord));
    }

    function deleteOrder(id){
        setOrders(prevOrders=>prevOrders.filter(ord=>ord.id!==id));
    }

    return(
        <OrderContext.Provider value={{orders, addOrder, updateOrder, deleteOrder}}>
            {children}
        </OrderContext.Provider>
    )
}