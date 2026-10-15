import { Router } from "express";
import { BicycleDetailController } from "./bicycle-detail.controller";

const router = Router();

router.get("/", BicycleDetailController.getAll);

router.get("/:id", BicycleDetailController.getById);

router.post("/", BicycleDetailController.create);

router.put("/:id", BicycleDetailController.update);

router.delete("/:id", BicycleDetailController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;