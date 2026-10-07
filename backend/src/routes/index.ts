import { Router } from "express";
import bicycleRoutes from "../modules/bicycles/bicycle.routes";
import brandRoutes from "../modules/brands/brand.routes";
import BicycleDetailRoutes from "../modules/bicycle-details/bicycle-detail.routes";
import CustomerRoutes from "../modules/customers/customer.routes";
import OrderRoutes from "../modules/orders/order.routes";

const router = Router();

router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", BicycleDetailRoutes);
router.use("/customers", CustomerRoutes);
router.use("/orders", OrderRoutes);

export default router;