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
      const cart = await Cart.findByPk(cartId)
      let totalPrice = 0
      if (!cart) throw new Error('購物車不存在')
      const cartItem = await CartItem.findOne({ where: { productId } })
      const cartItems = await CartItem.findAll({ raw: true })
      if (cartItem) {
        await cartItem.update({
          quantity: Number(cartItem.quantity) + Number(quantity),
          price: Number(cartItem.price) + Number(price)
        })
        await cartItems.forEach(c => { totalPrice += c.price })
        await cart.update({ totalPrice })
        req.flash('success_messages', '商品已加入購物車')
        return res.redirect(`products/${productId}`)
      }
      await CartItem.create({ quantity, price, cartId, productId })
      await cart.update({
        totalPrice: cart.totalPrice += price
      })
      req.flash('success_messages', '商品已加入購物車')
      return res.redirect(`products/${productId}`)
    } catch (error) {
      next(error)
    }
  },
  getCart: async (req, res, next) => {
    try {
      const cartId = req.params.id
      const Products = []
      let totalPrice = 0
      let cart = await Cart.findAll({ where: { id: cartId }, raw: true, nest: true, include: [Product] })
      if (!cart) throw new Error('購物車不存在')
      cart = await cart.forEach(c => {
        Products.push(c.Products)
        totalPrice = c.totalPrice
      })
      return res.render('cart', { totalPrice, cartId, Products })
    } catch (error) {
      next(error)
    }
  },
  getEditToCartPage: async (req, res, next) => {
    try {
      const productId = req.params.id
      const cartItem = await CartItem.findOne({ where: { productId }, raw: true })
      const product = await Product.findByPk(productId, { raw: true, nest: true, include: [Category] })
      if (!cartItem || !product) throw new Error('商品或購物車物品不存在')
      res.render('edit-cart', { product, cartItem })
    } catch (error) {
      next(error)
    }
  },
  editCartItem: async (req, res, next) => {
    try {
      const { quantity, productId, productPrice } = req.body
      const cartId = req.user.cartId
      if (!quantity) {
        req.flash('warning_msg', '加入購物車數量至少為 1')
        return res.redirect('back')
      }
      const price = Number(productPrice) * Number(quantity)
      const cart = await Cart.findByPk(cartId)
      if (!cart) throw new Error('購物車不存在')
      const cartItem = await CartItem.findOne({ where: { productId } })
      await cartItem.update({
        quantity: Number(quantity),
        price: Number(price)
      })
      await cart.update({
        totalPrice: cart.totalPrice += price
      })
      req.flash('success_messages', '成功編輯購物車商品')
      return res.redirect('back')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productControllers
