module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      UserID: {
        type: DataTypes.INTEGER,
        field: "UserID",
        autoIncrement: true,
        primaryKey: true,
      },
      UserName: DataTypes.INTEGER,
      Email: DataTypes.STRING(100),
      Password: DataTypes.STRING(250),
      VerifiedEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      Token:DataTypes.STRING(100),
      TokenExpired : DataTypes.DATE
    },
    {
      freezeTableName: true,
    }
  );
  Users.removeAttribute("id");

  Users.associate = (models) => {
   
  };
  return Users;
};
