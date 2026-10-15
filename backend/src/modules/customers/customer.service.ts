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


  // Receives the instance already loaded by the controller (the 404 check is done there).
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

  // required: true => INNER JOIN (only customers that have orders). Op.like uses % as wildcard.
  static async findCustomersWithOrdersByNameSearch(nameSearch: string) {
    return Customer.findAll({
      where: { name: { [Op.like]: '%${nameSearch}%' } },
      include: [{ model: Order, as: "orders", required: true }],
    });
  }
}