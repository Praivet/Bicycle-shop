import { BicycleModel } from "./bicycle-model.model";


export class BicycleModelService {

    static async findAll() {
        return BicycleModel.findAll({
            order: [["id", "ASC"]],
        });
    }




    static async findById(id: number) {
        return BicycleModel.findByPk(id);
    }


    static async create(data: {
        name: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return BicycleModel.create(data);
    }


    // Receives the instance already loaded by the controller (the 404 check is done there).
    static async update(
        bicycleModel: BicycleModel,
        data: {
            name?: string;
        }
    ) {
        return bicycleModel.update(data);
    }


    static async delete(bicycleModel: BicycleModel) {
        await bicycleModel.destroy();
    }
}