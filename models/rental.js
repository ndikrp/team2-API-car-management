'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    static associate(models) {
      Rental.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Rental.belongsTo(models.Car, {
        foreignKey: "carId",
      });
    }
  }
  
  Rental.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      carId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Rental",
    }
  );
  
  return Rental;
};
