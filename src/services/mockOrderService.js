import {initialOrder} from '../data/orders.js'

let mockOrders=[...initialOrders]


const MOCK_CONFIG={
    delayMs: 800,
    shouldFail: false,
    failureRate: 0.15,
}

const simulateNetwork=(action)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const isRandomFailure=Math.random()<MOCK_CONFIG.failureRate
            if(MOCK_CONFIG.shouldFail || isRandomFailure){
                return reject(new Error('Збій мережі або сервера'))
            }

            try{
                const result=action()
                resolve(result)
            } catch(error){
                reject(error)
            }
        }, MOCK_CONFIG.delayMs)
    })
}

export const mockOrderService={
    async getAll(){
        return simulateNetwork(()=>[...mockOrders])
    },

    async getById(id){
        return simulateNetwork(()=>{
            const order=mockOrders.find((item)=>item.id===id)
            if (!order){
                throw new Error(`Замовлення з id ${id} не знайдено`)
            }
            return {...order}
        })
    },

    async create(data){
        return simulateNetwork(()=>{
            const newOrder={
                ...data,
                id: `ord-${Date.now.toString().slice(-4)}`,
            };
            mockOrders=[newOrder, ...mockOrders];
            return {...newOrder}
        })
    },

    async update(id, data){
        return simulateNetwork(()=>{
            const index=mockOrders.findIndex((item)=>item.id===id);
            if(index===-1){
                throw new Error(`Замовлення з id ${id} не знайдено`)
            }
            mockOrders[index]={...mockOrders[index], ...data};
            return {...mockOrders[index]}
        })
    },

    async delete(id){
        return simulateNetwork(()=>{
            const index=mockOrders.findIndex((item)=>item.id===id);
            if(index===-1){
                throw new Error(`Замовлення з id ${id} не знайдено`)
            }
            mockOrders=mockOrderService.filter((item)=>item.id!==id)
            return {success: true, id}
        },MOCK_CONFIG.delayMs)
    },
}