const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  // many messages (1 to n)
  // onDelete: "CASCADE" - on delete of a user delete all of his messages
  User.associate = models => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });
    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }
    return user;
  };

  return User;
};
export default user;
