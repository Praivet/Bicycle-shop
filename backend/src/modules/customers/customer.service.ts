import { Customer } from "./customer.model";
import { Op } from "sequelize";
import { Order } from "../orders/order.model";

export class CustomerService {

  static async findAll() {
    return Customer.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Customer.findByPk(id);
  }


  static async create(data: {
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return Customer.create(data);
  }


  static async update(
    customer: Customer,
    data: {
      name: string;
      email: string;
    }
  ) {
    return customer.update(data);
  }


  static async delete(customer: Customer) {
    await customer.destroy();
  }

  static async findCustomersWithOrdersByNameSearch(nameSearch: string) {
    return Customer.findAll({
      where: { name: { [Op.like]: '%${nameSearch}%' } },
      include: [{ model: Order, as: "orders", required: true }],
    });
  }
}