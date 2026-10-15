import { Order } from "./order.model";
import { Customer } from "../customers/customer.model";
import { Bicycle } from "../bicycles/bicycle.model";
import { Model, Op } from "sequelize";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";

type statusTypes = "pending" | "shipped" | "paid" | "cancelled";

export class OrderService {

    static async findAll() {
        return Order.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Order.findByPk(id);
    }

    static async findByCustomerId(customerId: number) {
        return Order.findAll({
            where: { customerId },
            include: [{
                model: Customer,
                // same name than associations.ts
                as: "customer",
                // decide what attributes select sql
                attributes: ["id", "name", "email"]
            }],
            order: [["orderDate", "DESC"]],
        });
    }

    static findByBicycleCheapAndHeavy () {
        return Order.findAll ({
            include: [{
                model: Bicycle, as: "bicycles", where: { price: { [Op.lt]: 100} },

                include: [{ model: BicycleDetail, as: "detail", where: {weight: { [Op.gt]: 20 }},}]
                
            }],
            order: [["id", "ASC"]],
        })
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

    //posibility to update diferents
    static async update(
        order: Order,
        data: Partial<{
            customerId: number;
            orderDate: Date;
            status: statusTypes;
        }>
    ) {
        return order.update(data);
    }


    static async delete(order: Order) {
        await order.destroy();
    }
}