import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

// 'One' side of 1:N BicycleModel -> Bicycle. No FK here: the FK is in Bicycle.
export class BicycleModel extends Model<
    InferAttributes<BicycleModel>,
    InferCreationAttributes<BicycleModel>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

BicycleModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        createdAt: DataTypes.DATE,

        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,

        // tableName is what 'references.model' must point to in other models (here Bicycle).
        tableName: "bicycleModels",

        timestamps: true,
    }
);