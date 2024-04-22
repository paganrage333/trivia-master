'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      UserID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserName: Sequelize.STRING(100),
      Email: Sequelize.STRING(100),
      Password: Sequelize.STRING(255),
      VerifiedEmail: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      Token:Sequelize.STRING(100),
      TokenExpired : Sequelize.DATE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};