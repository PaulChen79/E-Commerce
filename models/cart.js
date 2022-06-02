'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Cart.hasOne(models.User, { foreignKey: 'cartId' })
      Cart.hasMany(models.Order, { foreignKey: 'cartId' })
      Cart.belongsToMany(models.Product, { through: models.CartItem, foreignKey: 'cartId' })
    }
  }
  Cart.init({
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true
  })
  return Cart
}
