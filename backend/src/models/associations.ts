import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model.js";
import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";
import { Customer } from "../modules/customers/customer.model.js";
import { OrderItem } from "../modules/order-items/order-item.model.js";
import { Order } from "../modules/orders/order.model.js";
import { BicycleModel } from "../modules/bicycle-models/bicycle-model.model.js";

export function defineassociations() {
    console.log("association defined");

    // RULE: the FK lives in the 'belongs to' side. Same foreignKey in both lines of a pair.
    // The 'as' alias is the name used later in include (and the field name in the JSON).
    // 1:N Brand -> Bicycle (FK brandId in bicycles). hasMany = parent side, belongsTo = holds the FK.
    Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
    Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
    // 1:N Customer -> Order (FK customerId in orders).
    Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

    // N:M Order <-> Bicycle through order_items (join table). Needs a belongsToMany on BOTH sides.
    // Alias 'bicycles' is the one to use when including Bicycle from Order.
    Order.belongsToMany(Bicycle, { through: OrderItem, foreignKey: "orderId", otherKey: "bicycleId", as: "bicycles", });
    Bicycle.belongsToMany(Order, { through: OrderItem, foreignKey: "bicycleId", otherKey: "orderId", as: "orders", })


    // Direct links to the join table: lets us include the order items too (aliases items / bicycle).
    Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
    Bicycle.hasMany(OrderItem, { foreignKey: "bicycleId", as: "orderItems" });
    OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });


    // 1:1 Bicycle -> BicycleDetail (FK bicycleId in bicycle-details). Alias is 'detail' (singular!).
    Bicycle.hasOne(BicycleDetail, { foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE" });
    BicycleDetail.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });

    // 1:N BicycleModel -> Bicycle (FK bicycleModelid in bicycles).
    // Check: same FK name in the Bicycle model, in both lines, and the right import path above.
    BicycleModel.hasMany(Bicycle, { foreignKey: "bicycleModelid", as: "bicycles" });
    Bicycle.belongsTo(BicycleModel, { foreignKey: "bicycleModelid", as: "bicycleModel" });

}