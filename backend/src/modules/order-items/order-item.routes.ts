import { Router } from "express";
import { OrderItemController } from "./order-item.controller";

const router = Router();

router.get("/", OrderItemController.getAll);

router.get("/:id", OrderItemController.getById);

router.post("/", OrderItemController.create);

router.put("/:id", OrderItemController.update);

router.delete("/:id", OrderItemController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;