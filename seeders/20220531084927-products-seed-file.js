'use strict'
const faker = require('@faker-js/faker').faker
const sizeList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const categories = await queryInterface.sequelize.query(
        'SELECT id FROM Categories;',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      )
      await queryInterface.bulkInsert('Products',
        Array.from({ length: 50 }, () => ({
          name: faker.commerce.product(),
          image_link: `https://loremflickr.com/320/240/clothing/?random=${Math.random() * 100}`,
          size: sizeList[Math.floor(Math.random() * 7)],
          invetory: faker.random.numeric(2),
          color: faker.color.human(),
          description: faker.lorem.sentence(5),
          price: faker.commerce.price(100, 200, 0),
          category_id: categories[Math.floor(Math.random() * categories.length)].id,
          created_at: new Date(),
          updated_at: new Date()
        }))
      )
    } catch (error) {
      console.log(error)
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
}
