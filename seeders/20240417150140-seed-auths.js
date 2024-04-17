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
    await queryInterface.bulkInsert("Auths", [
      {
        email: "hafiedz@mail.com",
        password:
          "$2a$12$52jmU1ASdJaCPNaZyCPIKOaiQV/3Ms7A41qv7lgZ2PMc2gCuOdWbe",
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        email: "rafli@mail.com",
        password:
          "$2a$12$zb2fr.qMk1L5DNqUUrm/QeZEd6ab7kv4LJqw4QR0hjp0jHIqsgWO2",
        userId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        email: "andhika@mail.com",
        password:
          "$2a$12$52jmU1ASdJaCPNaZyCPIKOaiQV/3Ms7A41qv7lgZ2PMc2gCuOdWbe",
        userId: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        email: "rendi@mail.com",
        password:
          "$2a$12$zb2fr.qMk1L5DNqUUrm/QeZEd6ab7kv4LJqw4QR0hjp0jHIqsgWO2",
        userId: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        email: "gita@mail.com",
        password:
          "$2a$12$52jmU1ASdJaCPNaZyCPIKOaiQV/3Ms7A41qv7lgZ2PMc2gCuOdWbe",
        userId: 5,
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
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
