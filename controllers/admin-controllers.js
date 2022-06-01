const { Product, Category, User } = require('../models')
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
      if (!product) throw new Error('商品不存在')
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
  },
  getEditProductPage: async (req, res, next) => {
    try {
      const productId = req.params.id
      const categories = await Category.findAll({ raw: true })
      const product = await Product.findByPk(productId, { raw: true, nest: true, include: [Category] })
      if (!product) throw new Error('商品不存在')
      return res.render('admin/edit-product', { product, categories })
    } catch (error) {
      next(error)
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const {
        name,
        categoryId,
        size,
        invetory,
        color,
        price,
        description
      } = req.body
      const { file } = req
      if (!name || !categoryId || !size || !invetory || !color || !price || !description) {
        req.flash('warning_msg', '需要填寫所有項目')
        return res.redirect('back')
      }
      const filePath = await localFileHandler(file)
      const product = await Product.findByPk(productId)
      if (!product) throw new Error('商品不存在')
      await product.update({
        name,
        categoryId,
        size,
        invetory,
        color,
        price,
        description,
        imageLink: filePath || product.imageLink
      })
      req.flash('success_messages', '成功編輯商品')
      return res.redirect('/admin/products')
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId)
      if (!product) throw new Error('商品不存在')
      await product.destroy()
      req.flash('success_messages', '成功刪除商品')
      return res.redirect('/admin/products')
    } catch (error) {
      next(error)
    }
  },
  getUsersPage: async (req, res, next) => {
    try {
      const users = await User.findAll({ raw: true })
      return res.render('admin/users', { users })
    } catch (error) {
      next(error)
    }
  },
  setAdmin: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      if (!user) throw new Error('使用者不存在')
      if (user.email === 'root@example.com') {
        req.flash('warning_msg', '禁止變更root權限')
        return res.redirect('/admin/users')
      }
      await user.update({
        isAdmin: !user.isAdmin
      })
      req.flash('success_messages', '成功變更權限')
      return res.redirect('/admin/users')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminControllers
