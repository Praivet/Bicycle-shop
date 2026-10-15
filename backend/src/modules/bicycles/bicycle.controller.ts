import { Request, Response, NextFunction } from "express";
import { BicycleService } from "./bicycle.service";

export class BicycleController {

  // Param is a string (material name), so String() and no conversion to number.
  static async getAllEagerlyByFrameMaterial(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const frameMaterial = String(req.params.frameMaterial);

      const bicycles = await BicycleService.findAllEagerlyByFrameMaterial(frameMaterial);

      res.json(bicycles);
    } catch (error) {
      next(error);
    }
  }
  
  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycle = await BicycleService.findEagerlyById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      res.json(bicycle);

    } catch (error) {
      next(error);
    }
  }

  // Eager endpoint without params: GET /api/bicycles/eagerly.
  static async getAllEagerly(req: Request, res: Response, next: NextFunction) {
  try {
    const bicycles = await BicycleService.findAllEagerly();
    res.json(bicycles);
  } catch (error) {
    next(error);
  }
}

// Number(req.params.price): the name after ':' in the route is the name in req.params.
static async getByPriceGreaterThan(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    const price = Number(req.params.price);

      const bicycles = await BicycleService.findByPriceGreaterThan(price);

      res.json(bicycles);
    } catch (error) {
      next(error);
    }
  }


  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bicycles = await BicycleService.findAll();

      res.json(bicycles);
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

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      res.json(bicycle);

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
      const { bicycleModelid, brandId, model, description, price, stock } = req.body;

      if (!brandId || !model || price === undefined) {
        res.status(400).json({
          message: "brandId, model and price are required",
        });

        return;
      }

      const bicycle = await BicycleService.create({
        model,
        bicycleModelid,
        description,
        price,
        stock,
        brandId,
      });

      res.status(201).json(bicycle);

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

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      const updatedBicycle = await BicycleService.update(
        bicycle,
        req.body
      );

      res.json(updatedBicycle);

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

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      await BicycleService.delete(bicycle);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}