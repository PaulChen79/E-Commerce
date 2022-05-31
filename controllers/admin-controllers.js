const { Product, Category } = require('../models')

const adminControllers = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true, nest: true, include: [Category] })
      console.log(req.user)
      return res.render('admin/products', { products })
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId, { raw: true, nest: true, include: [Category] })
      if (!product) {
        req.flash('warning_msg', '商品不存在')
        return res.redirect('back')
      }
      return res.render('admin/product', { product })
    } catch (error) {
      next(error)
    }
  },
  getCreateProductPage: (req, res, next) => {
    try {
      res.render('admin/create_product')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminControllers
