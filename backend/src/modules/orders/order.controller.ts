import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";

export class OrderController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orders = await OrderService.findAll();

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  // No params: the values (100 and 20) are fixed in the service. GET /api/orders/cheap-heavy-bicycles.
  static async getByCheapAndHeavyBicycles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orders = await OrderService.findByBicycleCheapAndHeavy();

      res.json(orders);
    } catch (error) {
      next(error);
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
      const order = await OrderService.findById(id);

      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });

        return;
      }

      res.json(order);

    } catch (error) {
      next(error);
    }
  }


  // NOTE: there is no route for this handler yet in order.routes.ts (service and controller are ready).
  static async getByCustomerId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const customerId = Number(req.params.id);
      const orders = await OrderService.findByCustomerId(customerId);

      if (!orders) {
        res.status(404).json({
          message: "Orders not found",
        });

        return;
      }

      res.json(orders);

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
      const { customerId, orderDate, status, createdAt, updatedAt } = req.body;

      if (!customerId === undefined) {
        res.status(400).json({
          message: "customerId is required",
        });

        return;
      }

      const order = await OrderService.create({
        customerId,
        orderDate,
        status,
        createdAt,
        updatedAt
      });

      res.status(201).json(order);

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
      const order = await OrderService.findById(id);

      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });

        return;
      }

      const updatedOrder = await OrderService.update(order, req.body);

      res.json(updatedOrder);

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
      const order = await OrderService.findById(id);

      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });

        return;
      }

      await OrderService.delete(order);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}