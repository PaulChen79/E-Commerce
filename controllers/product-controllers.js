const { Product, Category } = require('../models')
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
  }
}

module.exports = productControllers
