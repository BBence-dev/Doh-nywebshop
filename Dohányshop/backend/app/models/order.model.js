module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("Orders", {
      nev: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      db: {
        type: Sequelize.INTEGER
      },
      ar: {
        type: Sequelize.INTEGER
      }
    });
  
    return Orders;
  };
  