
import { OrderItem } from "../order-items/order-item.model";



export class OrderItemService {
    static findByOrderItemId(orderItemId: number) {
      throw new Error("Method not implemented.");
    }

    // Service of the join table of the N:M Order <-> Bicycle.
    static async findAll() {
        return OrderItem.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return OrderItem.findByPk(id);
    }


    static async create(data: {
        orderId: number;
        bicycleId: number;
        quantity: number;
        unitPrice: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return OrderItem.create(data);
    }

    //posibility to update diferents
    // Receives the instance already loaded by the controller (the 404 check is done there).
    static async update(
        order: OrderItem,
        data: Partial<{
            orderId: number;
            bicycleId: number;
            quantity: number;
            unitPrice: number;

        }>
    ) {
        return order.update(data);
    }


    static async delete(order: OrderItem) {
        await order.destroy();
    }
}