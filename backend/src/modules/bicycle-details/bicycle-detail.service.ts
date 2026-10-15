import { BicycleDetail } from "./bicycle-detail.model";

export class BicycleDetailService {

  static async findAll() {
    return BicycleDetail.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return BicycleDetail.findByPk(id);
  }


  static async create(data: {
    bicycleId: number;
    frameMaterial: "Aluminum" | "Carbon" | "Steel" | "Titanium";
    wheelSize: number;
    weight: number;
    suspension: string | null;
    createdAt? : Date;
    updatedAt? : Date;
  }) {
    return BicycleDetail.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    BicycleDetail: BicycleDetail,
    data: {
      bicycleId?: number;
    }
  ) { 
    return BicycleDetail.update(data);
  }


  static async delete(BicycleDetail: BicycleDetail) {
    await BicycleDetail.destroy();
  }
}