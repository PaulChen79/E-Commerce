const { Product, Category, CartItem, Cart } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const productControllers = {
  getProducts: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const categoryId = req.query.categoryId || ''
      const products = await Product.findAndCountAll({
        raw: true,
        nest: true,
        include: [Category],
        where: { ...categoryId ? { categoryId } : {} },
        limit,
        offset
      })
      const categories = await Category.findAll({ raw: true })
      const data = await products.rows.map(product => ({
        ...product, description: product.description.substring(0, 50) + '...'
      }))
      return res.render('products', {
        products: data,
        categories,
        categoryId,
        pagination: getPagination(limit, page, products.count)
      })
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId, { raw: true, nest: true, include: [Category] })
      if (!product) throw new Error('商品不存在')
      return res.render('product', { product })
    } catch (error) {
      next(error)
    }
  },
  addToCart: async (req, res, next) => {
    try {
      const { quantity, productId, productPrice } = req.body
      const cartId = req.user.cartId
      if (!quantity) {
        req.flash('warning_msg', '加入購物車數量至少為 1')
        return res.redirect('back')
      }
      const price = Number(productPrice) * Number(quantity)
      await CartItem.create({ quantity, price, cartId, productId })
      req.flash('success_messages', '商品已加入購物車')
      res.redirect(`products/${productId}`)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productControllers
