import { Request, Response, NextFunction } from "express";
import { CustomerService } from "./customer.service";

export class CustomerController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const customers = await CustomerService.findAll();

      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomersWithOrdersByNameSearch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        const nameSearch = String(req.params.name_search);
        const customers = await CustomerService.findCustomersWithOrdersByNameSearch(nameSearch);

        res.json(customers)
    } catch (error) {
        next (error);
    }
  }


  // Route params arrive as strings: convert with Number(). 404 if nothing was found.
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer= await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      res.json(customer);

    } catch (error) {
      next(error);
    }
  }


  // Validate the required fields (400) before calling the service. 201 = created.
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {name, email, createdAt, updatedAt } = req.body;

      if (!name) {
        res.status(400).json({
          message: "name is required",
        });

        return;
      }

      const customer = await CustomerService.create({
         name,
        createdAt,
        email,
        updatedAt,
      });

      res.status(201).json(customer);

    } catch (error) {
      next(error);
    }
  }


  // Find first (404 if missing), then pass the loaded instance to the service.
  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      const updatedCustomer = await CustomerService.update(
        customer,
        req.body
      );

      res.json(updatedCustomer);

    } catch (error) {
      next(error);
    }
  }


  // Find first (404 if missing), then delete. 204 = success with no body.
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      await CustomerService.delete(customer);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }

  // :name_search comes from req.params (route /:name_search/orders).
  static async getOrdersByCustomerName(req: Request, res: Response, next: NextFunction) {
        try {
            const nameSearch = String(req.params.name_search);
            const customers = await CustomerService.findCustomersWithOrdersByNameSearch(nameSearch);
            res.json(customers);
        } catch (error) {
            next(error);
        }
    }
    
}