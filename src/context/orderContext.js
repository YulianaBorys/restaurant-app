import {createContext, useContext} from 'react';

const OrderContext=createContext(null);

export function useOrders(){
    const context=useContext(OrderContext);
    if(!context){
        throw new Error('useOrders must be within an OrderProvider');
    }
    return context;
}

export default OrderContext;