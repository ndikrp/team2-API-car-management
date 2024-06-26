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
    await queryInterface.bulkInsert("Users", [
      {
        name: "Hafiedz",
        age: 20,
        address: "Indonesia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "Admin",
        image: "gambar1.png",
      },
      {
        name: "Rafli",
        age: 20,
        address: "Indonesia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "Manager",
        image: "gambar1.png",
        rentalId: 1,
      },
      {
        name: "Andhika",
        age: 20,
        address: "Indonesia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "Admin",
        image: "gambar1.png",
      },
      {
        name: "Rendi",
        age: 20,
        address: "Indonesia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "Manager",
        image: "gambar1.png",
        rentalId: 2,
      },
      {
        name: "Gita",
        age: 20,
        address: "Indonesia",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "Staff",
        rentalId: 1,
        image: "gambar1.png",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
