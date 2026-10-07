import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model.js";
import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";

export function defineassociations() {
    console.log ("association defined");

    Brand.hasMany(Bicycle, {foreignKey: "brandId", as: "bicycles"});
    Bicycle.belongsTo(Brand, {foreignKey: "brandId", as: "brand"});
    Customer.hasMany(Order, {foreignKey: "customerId", as: "orders" });
    getDefaultResultOrder.belognsTo(Customer, {foreignKey: "customerId", as: "customer"});

    Bicycle.hasOne(BicycleDetail, {
        foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE"
    });
    BicycleDetail.belongsTo(Bicycle,
        {
            foreignKey: "BicycleId", as: "bicycle"
        });

}