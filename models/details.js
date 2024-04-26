"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Details.belongsTo(models.Car, {
        foreignKey: {
          name: "carId",
        },
      });
    }
  }
  Details.init(
    {
      description:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      productionYear: DataTypes.INTEGER,
      carType: DataTypes.STRING,
      size: DataTypes.STRING,
      imageUrl: DataTypes.ARRAY(DataTypes.STRING),
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Details",
    }
  );
  return Details;
};
