'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BillingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      BillingAddress.belongsTo(models.User, { foreignKey: 'billingAddress' })
      BillingAddress.belongsTo(models.Order, { foreignKey: 'billingAddress' })
    }
  }
  BillingAddress.init({
    address: DataTypes.STRING,
    dist: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BillingAddress',
    tableName: 'BillingAddress',
    underscored: true
  })
  return BillingAddress
}
