import { Router } from "express";
import { BrandController } from "./brand.controller";

const router = Router();

router.get("/", BrandController.getAll);

router.get("/:id", BrandController.getById);

router.post("/", BrandController.create);

router.put("/:id", BrandController.update);

router.delete("/:id", BrandController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;