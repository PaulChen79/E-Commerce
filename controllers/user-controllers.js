const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { User } = require('../models')

const userControllers = {
  getSigninPage: (req, res, next) => {
    try {
      return res.render('signin')
    } catch (error) {
      next(error)
    }
  },
  getSignupPage: (req, res, next) => {
    try {
      return res.render('signup')
    } catch (error) {
      next(error)
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { userName, email, password, passwordCheck } = req.body

      if (!email || !password || !passwordCheck) {
        req.flash('warning_msg', '所有項目都要填寫')
        return res.redirect('back')
      }

      if (password !== passwordCheck) {
        req.flash('warning_msg', '確認密碼不相符')
        return res.redirect('back')
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { userName }
          ]
        }
      })

      if (user) {
        req.flash('warning_msg', 'Email或Username已經註冊過了')
        return res.redirect('back')
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      User.create({ userName, email, password: hash })
      req.flash('success_messages', '成功註冊帳號！')
      res.redirect('/signin')
    } catch (error) {
      next(error)
    }
  },
  signIn: (req, res, next) => {
    req.flash('success_messages', '成功註冊帳號！')
    res.redirect('/products')
  },
  logout: async (req, res, next) => {
    try {
      req.flash('success_messages', '登出成功！')
      req.logout()
      res.redirect('/signin')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userControllers
