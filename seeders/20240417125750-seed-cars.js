"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Cars", [
      {
        name: "Honda",
        rentPrice: 100000,
        userId: 1,
        rentalId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: JSON.stringify(["gambarmazda.png"]),
      },
      {
        name: "Innova",
        rentPrice: 100000,
        userId: 2,
        rentalId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: JSON.stringify(["gambarmazda.png"]),
      },
      {
        name: "Mazda",
        rentPrice: 100000,
        userId: 3,
        rentalId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: JSON.stringify(["gambarmazda.png"]),
      },
      {
        name: "BMW",
        rentPrice: 100000,
        userId: 4,
        rentalId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: JSON.stringify(["gambarmazda.png"]),
      },
      {
        name: "McLaren",
        rentPrice: 100000,
        userId: 5,
        rentalId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: JSON.stringify(["gambarmazda.png"]),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
