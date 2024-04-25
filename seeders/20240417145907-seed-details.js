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
    await queryInterface.bulkInsert("Details", [
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget purus in turpis mattis tristique.",
        productionYear: 2011,
        carType: "Suv",
        size: "Medium",
        imageUrl: ["gambar1.png", "gambar2.png", "gambar3.png"],
        carId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget purus in turpis mattis tristique.",
        productionYear: 2010,
        carType: "Sedan",
        size: "Small",
        imageUrl: ["gambar1.png", "gambar2.png", "gambar3.png"],
        carId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget purus in turpis mattis tristique.",
        productionYear: 2018,
        carType: "Suv-Electric",
        size: "Medium",
        imageUrl: ["gambar1.png", "gambar2.png", "gambar3.png"],
        carId: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget purus in turpis mattis tristique.",
        productionYear: 2022,
        carType: "Sport",
        size: "Small",
        imageUrl: ["gambar1.png", "gambar2.png", "gambar3.png"],
        carId: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget purus in turpis mattis tristique.",
        productionYear: 2016,
        carType: "Suv",
        size: "Large",
        imageUrl: ["gambar1.png", "gambar2.png", "gambar3.png"],
        carId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
    await queryInterface.bulkDelete("Details", null, {});
  },
};
