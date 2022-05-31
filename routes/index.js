const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const userControllers = require('../controllers/user-controllers')

router.get('/signup', userControllers.getSignupPage)
router.post('/signup', userControllers.signUp)
router.get('/signin', userControllers.getSigninPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userControllers.signIn)
router.get('/logout', userControllers.logout)

router.use('/', generalErrorHandler)
router.use('/', (req, res) => res.redirect('/products'))

module.exports = router
