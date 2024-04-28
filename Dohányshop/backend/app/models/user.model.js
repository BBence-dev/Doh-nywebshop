module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    nev: {
      type: Sequelize.STRING
    },
    kor: {
      type: Sequelize.INTEGER
    },
    szhely: {
      type: Sequelize.STRING
    }
  });

  return User;
};
