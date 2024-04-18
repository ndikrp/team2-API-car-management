"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auths extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auths.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Auths.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Auths",
    }
  );
  return Auths;
};
