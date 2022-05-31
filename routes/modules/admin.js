const express = require('express')
const router = express.Router()
const adminControllers = require('../../controllers/admin-controllers')

router.get('/products/create', adminControllers.getCreateProductPage)
router.get('/products/:id', adminControllers.getProduct)
router.get('/products', adminControllers.getProducts)
router.post('/products', adminControllers.createProduct)

router.get('/', (req, res) => res.redirect('/admin/products'))

module.exports = router
