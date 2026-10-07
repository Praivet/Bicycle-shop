import { Order } from "./order.model";

type statusTypes = "pending" | "paid" | "shipped" | "cancelled";

export class OrderService {

    static async findAll() {
        return Order.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Order.findByPk(id);
    }


    static async create(data: {
        customerId: number;
        orderDate?: Date;
        status?: statusTypes;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return Order.create(data);
    }


    static async update(
        Order: Order,
        data: {
            customerId: number;
            
        }
    ) {
        return Order.update(data);
    }


    static async delete(Order: Order) {
        await Order.destroy();
    }
}