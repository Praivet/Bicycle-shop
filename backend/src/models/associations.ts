import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";

export function defineassociations() {
    console.log ("association defined");

    Brand.hasMany(Bicycle, {foreignKey: "brandId", as: "bicycles"});
    Bicycle.belongsTo(Brand, {foreignKey: "brandId", as: "brand"});
}