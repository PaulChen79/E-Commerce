const { Product } = require('../models')

const productControllers = {
  getProducts: async (req, res, next) => {
    res.render('products')
  }
}

module.exports = productControllers
