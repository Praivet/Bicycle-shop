import { Order } from "./order.model";
import { Customer} from "../customers/customer.model"
type statusTypes = "pending" | "paid" | "shipped" | "cancelled";

export class OrderService {

    static async findByCustomerId(customerId: number) {
        return Order.findAll({
            where: { customerId},
            include: [{ 
                model: Customer, 
                
                as: "customer", 
                attributes: ["id", "name", "email"]}],
            order: [["orderDate", "DESC"]],
        });
    }


    static async findById(id: number) {
        return Order.findAll({
            order: [["id", "ASC"]],
        });
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