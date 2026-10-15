import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";
import { Brand } from "../brands/brand.model";
import { Bicycle } from "./bicycle.model";
import { BicycleModel } from "../bicycle-models/bicycle-model.model";
import { Op } from "sequelize";


export class BicycleService {

  static async findAll() {
    return Bicycle.findAll({
      order: [["id", "ASC"]],
    });
  }

  // 1:1 eager query. A where inside include => INNER JOIN (only bicycles whose detail matches).
  // 'as' must be exactly the alias declared in associations.ts.
  static async findAllEagerlyByFrameMaterial(frameMaterial: string) {
    return Bicycle.findAll({
      include: [
        {
          model: BicycleDetail,
          as: 'detail',
          where: {
            frameMaterial
          }
        }
      ],
      order: [["id", "ASC"]]
    });
  }


  static async findById(id: number) {
    return Bicycle.findByPk(id);
  }

  // 1:N eager query: a bicycle with its brand. include = JOIN with the associated table.
  static async findEagerlyById(id: number) {
    return Bicycle.findByPk(id, {
      include: [
        {
          model: Brand,
          as: 'brand'
        }
      ]
    });
  }

  // Two includes = two JOINs (brand and bicycleModel). Aliases come from associations.ts.
  // findAll (not findByPk) because we want every bicycle, not one.
  static async findAllEagerly() {
    return Bicycle.findAll({
      include: [
        { model: Brand, as: "brand" },
        { model: BicycleModel, as: "bicycleModel" },
      ],
      order: [["id", "ASC"]],
    });
  }

  // No include needed: price is a column of bicycles. Op.gt = greater than (import Op from sequelize).
  static async findByPriceGreaterThan(price: number) {
    return Bicycle.findAll({
      where: { price: { [Op.gt]: price } },
      order: [["id", "ASC"]],
    });
  }


  static async create(data: {
    brandId: number;
    bicycleModelid: number;
    model: string;
    description?: string | null;
    price: number;
    stock: number;
  }) {
    return Bicycle.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    bicycle: Bicycle,
    data: {
      brand?: string;
      model?: string;
      description?: string | null;
      price?: number;
      stock?: number;
    }
  ) {
    return bicycle.update(data);
  }


  static async delete(bicycle: Bicycle) {
    await bicycle.destroy();
  }
}