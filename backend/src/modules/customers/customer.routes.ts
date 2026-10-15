import { Router } from "express";
import { CustomerController } from "./customer.controller";

const router = Router();

router.get("/", CustomerController.getAll);

router.get("/:id", CustomerController.getById);

router.post("/", CustomerController.create);

router.put("/:id", CustomerController.update);

router.delete("/:id", CustomerController.delete);

// Two segments, so it does not clash with /:id. ':name_search' -> req.params.name_search.
router.get("/:name_search/orders", CustomerController.getOrdersByCustomerName);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;