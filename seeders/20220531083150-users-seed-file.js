'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const carts = await queryInterface.sequelize.query(
      'SELECT id FROM Carts;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Users', [{ // 一次新增三筆資料
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      user_name: 'root',
      cart_id: carts[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      user_name: 'user1',
      cart_id: carts[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      user_name: 'user2',
      cart_id: carts[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
