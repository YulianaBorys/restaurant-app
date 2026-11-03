/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} dishId
 * @property {string} clientName
 * @property {string} clientPhone
 * @property {string} address
 * @property {number} quantity
 * @property {boolean} needsCutlery
 * @property {string} [comment]
 * @property {string} createdAt
 */

export const orderServiceContract = {
    /**
     * Отримати всі замовлення
     * @returns {Promise<Order[]>}
     */
    async getAll() {
        throw new Error('getAll() не реалізовано');
    },

    /**
     * Отримати замовлення за ID
     * @param {string} id
     * @returns {Promise<Order>}
     */
    async getById(id) {
        void id;
        throw new Error('getId() не реалізовано');
    },

    /**
     * Створити нове замовлення
     * @param {Omit<Order, 'id' | 'createdAt'>} data
     * @returns {Promise<Order>}
     */
    async create(data) {
        void data;
        throw new Error('create() не реалізовано');
    },

    /**
     * Оновити існуюче замовлення
     * @param {string} id
     * @param {Partial<Order>} data
     * @returns {Promise<Order>}
     */
    async update(id, data) {
        void id;
        void data;
        throw new Error('update() не реалізовано');
    },

    /**
     * Видалити замовлення за ID
     * @param {string} id
     * @returns {Promise<{success: boolean, id: string}>}
     */
    async delete(id) {
        void id;
        throw new Error('delete() не реалізовано');
    },
};