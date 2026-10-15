import { Router } from "express";
import { BicycleController } from "./bicycle.controller";

const router = Router();

router.get("/", BicycleController.getAll);

router.get("/eagerly/:id", BicycleController.getEagerlyById);

router.get("/eagerly/frame-material/:frameMaterial", BicycleController.getAllEagerlyByFrameMaterial);

router.get("/eagerly", BicycleController.getAllEagerly);

router.get("/price-greater/:price", BicycleController.getByPriceGreaterThan);

// ORDER MATTERS: specific routes (/eagerly, /price-greater/:price) go BEFORE /:id.
// If /:id is first, Express reads 'eagerly' as an id.
router.get("/:id", BicycleController.getById);

router.post("/", BicycleController.create);

router.put("/:id", BicycleController.update);

router.delete("/:id", BicycleController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;