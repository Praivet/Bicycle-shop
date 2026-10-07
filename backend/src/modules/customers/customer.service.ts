import { Customer } from "./customer.model";

export class CustomerService {
  static findCustomersWithOrdersByNameSearch(nameSearch: string) {
    throw new Error("Method not implemented.");
  }

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
    createdAt? : Date;
    updatedAt? : Date;
  }) {
    return Customer.create(data);
  }


  static async update(
    brand: Customer,
    data: {
      name?: string;
      email?: string;
    }
  ) { 
    return brand.update(data);
  }


  static async delete(customer: Customer) {
    await customer.destroy();
  }
}