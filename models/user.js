'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasOne(models.ShippingAddress, { foreignKey: 'shippingAddress' })
      User.hasOne(models.BillingAddress, { foreignKey: 'billingAddress' })
      User.belongsTo(models.Cart, { foreignKey: 'cartId' })
      User.hasMany(models.Order, { foreignKey: 'userId' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    cartId: DataTypes.INTEGER,
    shippingAddress: DataTypes.INTEGER,
    billingAddress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
