import { Request, Response, NextFunction } from "express";
import { BrandService } from "./brand.service";

export class BrandController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const brands = await BrandService.findAll();

      res.json(brands);
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

      const brand= await BrandService.findById(id);

      if (!brand) {
        res.status(404).json({
          message: "Brand not found",
        });

        return;
      }

      res.json(brand);

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
      const {name, createdAt, updatedAt } = req.body;

      if (!name) {
        res.status(400).json({
          message: "name is required",
        });

        return;
      }

      const brand = await BrandService.create({
         name,
        createdAt,
        updatedAt,
      });

      res.status(201).json(brand);

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

      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).json({
          message: "Brand not found",
        });

        return;
      }

      const updatedBrand = await BrandService.update(
        brand,
        req.body
      );

      res.json(updatedBrand);

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

      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).json({
          message: "Brand not found",
        });

        return;
      }

      await BrandService.delete(brand);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}