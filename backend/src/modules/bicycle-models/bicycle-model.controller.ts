import { Request, Response, NextFunction } from "express";
import { BicycleModelService } from "./bicycle-model.service";

export class BicycleModelController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const bicycleModel = await BicycleModelService.findAll();

            res.json(bicycleModel);
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

            const bicycleModel = await BicycleModelService.findById(id);

            if (!bicycleModel) {
                res.status(404).json({
                    message: "Bicycle model not found",
                });

                return;
            }

            res.json(bicycleModel);

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
            const { name, createdAt, updatedAt } = req.body;

            if (!name) {
                res.status(400).json({
                    message: "bicycle model name is obligated",
                });

                return;
            }

            const bicycleModel = await BicycleModelService.create({
                name,
                createdAt,
                updatedAt,
            });

            res.status(201).json(bicycleModel);

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

            const bicycleModel = await BicycleModelService.findById(id);

            if (!bicycleModel) {
                res.status(404).json({
                    message: "bicycle model not found",
                });

                return;
            }

            const updatedBicycleModel = await BicycleModelService.update(
                bicycleModel,
                req.body
            );

            res.json(updatedBicycleModel);

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

            const bicycleModel = await BicycleModelService.findById(id);

            if (!bicycleModel) {
                res.status(404).json({
                    message: "Bicycle model not found",
                });

                return;
            }

            await BicycleModelService.delete(bicycleModel);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}