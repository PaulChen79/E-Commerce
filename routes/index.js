const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const admin = require('./modules/admin')
const userControllers = require('../controllers/user-controllers')
const productControllers = require('../controllers/product-controllers')

router.use('/admin', authenticatedAdmin, admin)

router.get('/signup', userControllers.getSignupPage)
router.post('/signup', userControllers.signUp)
router.get('/signin', userControllers.getSigninPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userControllers.signIn)
router.get('/logout', userControllers.logout)

router.get('/products/:id', productControllers.getProduct)
router.get('/products', authenticated, productControllers.getProducts)

router.put('/cartItems/:id', productControllers.editCartItem)
router.get('/cartItems/:id/edit', productControllers.getEditToCartPage)
router.post('/cartItems', productControllers.addToCart)

router.get('/cart/:id', productControllers.getCart)

router.post('/orders', (req, res) => console.log(req.body))

router.use('/', generalErrorHandler)
router.use('/', (req, res) => res.redirect('/products'))

module.exports = router
