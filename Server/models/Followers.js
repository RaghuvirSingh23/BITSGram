module.exports = (sequelize, DataTypes) => {
    const Followers = sequelize.define("Followers", {
      // userId: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Followers;
  };