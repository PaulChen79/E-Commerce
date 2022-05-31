'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' })
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'CartItems',
    underscored: true
  })
  return CartItem
}
