"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rental, {
        foreignKey: {
          name: "userId",
        },
      });

      User.hasMany(models.Car, {
        foreignKey: {
          name: "userId",
        },
      });

      User.hasOne(models.Auths, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: DataTypes.STRING,
      image: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.STRING,
        enum: ["Admin", "Manager", "Staff"],
        defaultValue: "Staff",
      },
      rentalId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
