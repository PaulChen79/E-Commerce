'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Product.hasMany(models.CartItem, { foreignKey: 'productId' })
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    size: DataTypes.STRING,
    invetory: DataTypes.INTEGER,
    color: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
