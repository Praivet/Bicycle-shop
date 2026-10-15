import { Router } from "express";
import bicycleRoutes from "../modules/bicycles/bicycle.routes";
import brandRoutes from "../modules/brands/brand.routes";
import BicycleDetailRoutes from "../modules/bicycle-details/bicycle-detail.routes";
import CustomerRoutes from "../modules/customers/customer.routes";
import OrderRoutes from "../modules/orders/order.routes";
import OrderItemRoutes from "../modules/order-items/order-item.routes";
import bicycleModelRoutes from "../modules/bicycle-models/bicycle-model.routes";

const router = Router();

// Every new module must be mounted here (and its model imported in server.ts).
router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", BicycleDetailRoutes);
router.use("/customers", CustomerRoutes);
router.use("/orders", OrderRoutes);
router.use("/order-items", OrderItemRoutes);
router.use("/bicycle-model", bicycleModelRoutes);

export default router;