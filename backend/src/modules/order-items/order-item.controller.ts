import { Request, Response, NextFunction } from "express";
import { OrderItemService } from "./order-item.service";


export class OrderItemController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orderItems = await OrderItemService.findAll();

      res.json(orderItems);
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
      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order item not found",
        });

        return;
      }

      res.json(orderItem);

    } catch (error) {
      next(error);
    }
  }


  static async getByOrderItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orderItemId = Number(req.params.id);
      const orderItems = await OrderItemService.findByOrderItemId(orderItemId);

      if (!orderItemId) {
        res.status(404).json({
          message: "Order items not found",
        });

        return;
      }

      res.json(orderItems);

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
      const { orderId, bicycleId, quantity, unitPrice, createdAt, updatedAt } = req.body;

      if (!orderId === undefined) {
        res.status(400).json({
          message: "orderId and bicycleId are required",
        });

        return;
      }

      const orderItem = await OrderItemService.create({
        orderId,
        bicycleId,
        quantity,
        unitPrice,
        createdAt,
        updatedAt
      });

      res.status(201).json(orderItem);

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
      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order item not found",
        });

        return;
      }

      const updatedOrderItem = await OrderItemService.update(orderItem,req.body);

      res.json(updatedOrderItem);

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
      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order item not found",
        });

        return;
      }

      await OrderItemService.delete(orderItem);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}