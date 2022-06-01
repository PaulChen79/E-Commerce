'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts', [{ // 一次新增三筆資料
      created_at: new Date(),
      updated_at: new Date()
    }, {
      created_at: new Date(),
      updated_at: new Date()
    }, {
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', null, {})
  }
}
