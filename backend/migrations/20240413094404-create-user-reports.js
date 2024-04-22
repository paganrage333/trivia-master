'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserReports', {
      UserReportsID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: Sequelize.INTEGER,
      no_of_question: Sequelize.INTEGER,
      incorrect_answers: Sequelize.INTEGER,
      correct_answer: Sequelize.INTEGER,
      category:Sequelize.INTEGER,
      repeated_question: {
        type: Sequelize.INTEGER,
        
      },
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
    await queryInterface.dropTable('UserReports');
  }
};