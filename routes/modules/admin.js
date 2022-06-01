const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const adminControllers = require('../../controllers/admin-controllers')

router.get('/products/create', adminControllers.getCreateProductPage)
router.get('/products/:id', adminControllers.getProduct)
router.delete('/products/:id', adminControllers.deleteProduct)
router.get('/products/:id/edit', adminControllers.getEditProductPage)
router.put('/products/:id', upload.single('image'), adminControllers.editProduct)
router.get('/products', adminControllers.getProducts)
router.post('/products', upload.single('image'), adminControllers.createProduct)

router.patch('/users/:id', adminControllers.setAdmin)
router.get('/users', adminControllers.getUsersPage)

router.get('/', (req, res) => res.redirect('/admin/products'))

module.exports = router
