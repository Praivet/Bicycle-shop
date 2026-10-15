import { Router } from "express";
import { BicycleModelController } from "./bicycle-model.controller";

const router = Router();

router.get("/", BicycleModelController.getAll);

router.get("/:id", BicycleModelController.getById);

router.post("/", BicycleModelController.create);

router.put("/:id", BicycleModelController.update);

router.delete("/:id", BicycleModelController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;