const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const adminControllers = require('../../controllers/admin-controllers')

router.get('/products/create', adminControllers.getCreateProductPage)
router.get('/products/:id', adminControllers.getProduct)
router.get('/products/:id/edit', adminControllers.getEditProductPage)
router.get('/products', adminControllers.getProducts)
router.post('/products', upload.single('image'), adminControllers.createProduct)

router.get('/', (req, res) => res.redirect('/admin/products'))

module.exports = router
