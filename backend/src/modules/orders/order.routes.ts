import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.get("/", OrderController.getAll);

router.get("/cheap-heavy-bicycles", OrderController.getByCheapAndHeavyBicycles);

// ORDER MATTERS: /cheap-heavy-bicycles must stay above /:id.
router.get("/:id", OrderController.getById);

router.post("/", OrderController.create);

router.put("/:id", OrderController.update);

router.delete("/:id", OrderController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;