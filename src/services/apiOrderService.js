const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/orders';

export const apiOrderService={
    async getAll(){
        const response=await fetch(API_URL)
        if(!response.ok){
            throw new Error(`Помилка завантаження замовлень (Статус: ${response.status})`)
        }
        return await response.json()
    },

    async getById(id){
        const response=await fetch(`${API_URL}/${id}`)
        if(!response.ok){
            throw new Error(`Замовлення з id ${id} не знайдено на сервері`)
        }
        return await response.json()
    },

    async create(data){
        const response=await fetch(API_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                createdAt: new Date().toISOString(),
            })
        })

        if(!response.ok){
            throw new Error(`Помилка при створення замовлення на сервері`)
        }
        return await response.json()
    },

    async update(id, data){
        const response=await fetch(`${API_URL}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if(!response.ok){
            throw new Error(`Помилка при оновленні замовлення  з id ${id} на сервері`)
        }
        return await response.json()
    },

    async delete(id){
        const response=await fetch(`${API_URL}/${id}`,{
            method: 'DELETE',
        }),

        if(!response.ok){
            throw new Error(`Помилка при видаленні замовлення  з id ${id} на сервері`)
        }
        return {success: true, id}
    },
}