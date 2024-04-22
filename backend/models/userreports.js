module.exports = (sequelize, DataTypes) => {
  const UserReports = sequelize.define(
    "UserReports",
    {
      UserReportsID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: DataTypes.INTEGER,
      no_of_question: DataTypes.INTEGER,
      incorrect_answers: DataTypes.INTEGER,
      correct_answer: DataTypes.INTEGER,
      category:DataTypes.INTEGER,
      repeated_question: {
        type: DataTypes.INTEGER,
        
      },

    },
    {
      freezeTableName: true,
    }
  );
  UserReports.removeAttribute("id");

  UserReports.associate = (models) => {
   
  };
  return UserReports;
};
