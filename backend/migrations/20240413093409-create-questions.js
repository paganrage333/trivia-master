'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      QuestionID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: Sequelize.INTEGER,
      question: Sequelize.STRING(100),
      incorrect_answers: Sequelize.STRING(1024),
      correct_answer: Sequelize.STRING(300),
      category:Sequelize.INTEGER,
      repeat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      viewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showUser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Questions');
  }
};