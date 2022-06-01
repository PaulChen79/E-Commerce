const { Product, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

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
  getCreateProductPage: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })
      res.render('admin/create-product', { categories })
    } catch (error) {
      next(error)
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const {
        name,
        categoryId,
        size,
        invetory,
        color,
        price,
        description
      } = req.body
      console.log(req.body)
      const { file } = req
      if (!name || !categoryId || !size || !invetory || !color || !price || !description) {
        req.flash('warning_msg', '需要填寫所有項目')
        return res.redirect('back')
      }
      const filePath = await localFileHandler(file)
      await Product.create({
        name,
        categoryId,
        size,
        invetory,
        color,
        price,
        description,
        imageLink: filePath || null
      })
      req.flash('success_messages', '成功創建商品')
      return res.redirect('/admin/products')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminControllers
