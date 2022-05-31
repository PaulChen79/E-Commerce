const express = require('express')
const router = express.Router()
const adminControllers = require('../../controllers/admin-controllers')

router.get('/products/:id', adminControllers.getProduct)
router.get('/products', adminControllers.getProducts)

router.get('/', (req, res) => res.redirect('/admin/products'))

module.exports = router
