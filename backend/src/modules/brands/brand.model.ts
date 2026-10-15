import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

// 'One' side of 1:N Brand -> Bicycle. No FK here: the FK (brandId) is in Bicycle.
export class Brand extends Model<
  InferAttributes<Brand>,
  InferCreationAttributes<Brand>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Brand.init(
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

    tableName: "brands",

    timestamps: true,
  }
);