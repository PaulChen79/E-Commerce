'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Order.hasOne(models.ShippingAddress, { foreignKey: 'shippingAddress' })
      Order.hasOne(models.BillingAddress, { foreignKey: 'billingAddress' })
      Order.belongsTo(models.Cart, { foreignKey: 'cartId' })
      Order.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Order.init({
    cartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    shippingAddress: DataTypes.INTEGER,
    billingAddress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  return Order
}
