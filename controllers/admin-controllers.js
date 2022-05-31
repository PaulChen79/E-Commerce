const { Product, Category } = require('../models')

const adminControllers = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true, nest: true, include: [Category] })
      return res.render('admin/products', { products })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminControllers
