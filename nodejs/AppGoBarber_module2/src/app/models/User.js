module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    passoword_hash: DataTypes.STRING,
    provider: DataTypes.BOOLEAN
  });

  return User;
};
