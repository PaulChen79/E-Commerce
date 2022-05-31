'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ShippingAddress.belongsTo(models.User, { foreignKey: 'shippingAddress' })
      ShippingAddress.belongsTo(models.Order, { foreignKey: 'shippingAddress' })
    }
  }
  ShippingAddress.init({
    address: DataTypes.STRING,
    dist: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShippingAddress',
    tableName: 'ShippingAddress',
    underscored: true
  })
  return ShippingAddress
}
