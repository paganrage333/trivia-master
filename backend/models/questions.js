module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    "Questions",
    {
      QuestionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: DataTypes.INTEGER,
      question: DataTypes.STRING(100),
      incorrect_answers: DataTypes.STRING(1024),
      correct_answer: DataTypes.STRING(300),
      category:DataTypes.INTEGER,
      repeat: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

    },
    {
      freezeTableName: true,
    }
  );
  Questions.removeAttribute("id");

  Questions.associate = (models) => {
   
  };
  return Questions;
};
