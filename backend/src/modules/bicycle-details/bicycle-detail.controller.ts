import { Request, Response, NextFunction } from "express";
import { BicycleDetail } from "./bicycle-detail.model";
import { Bicycle } from "../bicycles/bicycle.model";
import { BicycleDetailService } from "./bicycle-detail.service";

export class BicycleDetailController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bicycle = await BicycleDetailService.findAll();

      res.json(bicycle);
    } catch (error) {
      next(error);
    }
  }


  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycle= await BicycleDetailService.findById(id);

      if (!BicycleDetail) {
        res.status(404).json({
          message: "Detalles de bicicleta no encontrada",
        });

        return;
      }

      res.json(BicycleDetail);

    } catch (error) {
      next(error);
    }
  }


  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {bicycleId, frameMaterial, wheelSize, weight, suspension, createdAt, updatedAt } = req.body;

      if (!bicycleId) {
        res.status(400).json({
          message: "el id es obligatorio",
        });

        return;
      }

      const BicycleDetail= await BicycleDetailService.create({
         bicycleId,
         frameMaterial,
         wheelSize,
         weight,
         suspension,
        createdAt,
        updatedAt,
      });

      res.status(201).json(BicycleDetail);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const BicycleDetail = await BicycleDetailService.findById(id);

      if (!BicycleDetail) {
        res.status(404).json({
          message: "Marca no encontrada",
        });

        return;
      }

      const updatedBicycleDetail = await BicycleDetailService.update(
        BicycleDetail,
        req.body
      );

      res.json(updatedBicycleDetail);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const BicycleDetail = await BicycleDetailService.findById(id);

      if (!BicycleDetail) {
        res.status(404).json({
          message: "Detalles de bicicleta no encontrada",
        });

        return;
      }

      await BicycleDetailService.delete(BicycleDetail);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}