"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.hasMany(models.Car, {
        foreignKey: {
          name: "rentalId",
        },
      });

      Rental.hasMany(models.User, {
        foreignKey: {
          name: "rentalId",
        },
      });
    }
  }
  Rental.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Rental",
    }
  );
  return Rental;
};
