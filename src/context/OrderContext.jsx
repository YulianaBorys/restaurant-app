import {useState, createContext, useContext, useEffect} from 'react';
import {mockOrderService as mockOrderService} from '../services/mockOrderService.js'
import {orderService} from '../services/index.js'
export const OrderContext=createContext(null)

export function OrderProvider({children}){
    const [orders, setOrders]=useState([]);
    const [isLoading, setIsLoading]=useState(true);

    const fetchOrders=async()=>{
        setIsLoading(true);
        try{
            const data=await mockOrderService.getAll();
            setOrders(data)
        } catch(err){
            console.error('Помилка завантаження: ',err)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchOrders()
    }, [])

    const addOrder=async(newOrderData)=>{
        const created =await orderService.create(newOrderData)
        setOrders((prev)=> [created, ...prev])
        return created.id
    }

    const updateOrder=async (id, updateData)=>{
        const updated =await orderService.update(id, updateData)
        setOrders((prevOrders)=>
        prevOrders.map((ord)=>(ord.id===id?update:ord))
    )
    return updated
    }

    const deleteOrder=async (id)=>{
        await orderService.delete(id)
        setOrders((prevOrders)=>prevOrders.filter((ord)=>ord.id!==id))
    }

    return(
        <OrderContext.Provider 
        value={
            {orders, 
            isLoading,
            fetchOrders,
            addOrder, 
            updateOrder, 
            deleteOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export function useOrders(){
    const next=useContext(OrderContext)
    if(!context){
        throw new Error('useOrders must be used within an OrderProvider')
    }
    return context;
}