'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Car.init({
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    rentPrice: DataTypes.INTEGER,
    image_url: DataTypes.INTEGER,
    createdByUser: DataTypes.INTEGER,
    lastUpdatedByUser: DataTypes.INTEGER,
    deletedByUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
    paranoid: true
  });
  return Car;
};