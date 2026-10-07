import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model.js";
import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";
import { Customer } from "../modules/customers/customer.model.js";
import { OrderItem } from "../modules/order-items/order-item.model.js";
import { Order } from "../modules/orders/order.model.js";

export function defineassociations() {
    console.log("association defined");

    Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
    Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
    Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

    Order.belongsToMany(Bicycle, { through: OrderItem, foreignKey: "orderId", otherKey: "bicycleId", as: "bibycles", });
    Bicycle.belongsToMany(Order, { through: OrderItem, foreignKey: "bicycleId", otherKey: "orderId", as: "orders", })


    Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
    Bicycle.hasMany(OrderItem, { foreignKey: "bicycleId", as: "orderItems" });
    OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });


    Bicycle.hasOne(BicycleDetail, {
        foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE"
    });
    BicycleDetail.belongsTo(Bicycle,
        {
            foreignKey: "BicycleId", as: "bicycle"
        });

}