module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      nev: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      db: {
        type: Sequelize.INTEGER
      },
      ar: {
        type: Sequelize.INTEGER
      }
    });
  
    return Products;
  };
  