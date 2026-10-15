import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare bicycleId: number;
  declare quantity: number;
  declare unitPrice: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    // Join table of the N:M Order <-> Bicycle: it holds both FKs (orderId and bicycleId).
    // Create the order and the bicycle first, then the order item (FK order).
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    bicycleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
      validate: { min: 1 }
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2), allowNull: false,
      validate: { min: 0 }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: "order_items", modelName: "OrderItem", timestamps: true }
);