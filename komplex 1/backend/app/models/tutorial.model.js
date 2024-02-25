module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    nev: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    kor: {
      type: Sequelize.STRING
    },
    szhely: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};
