module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      nev: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      db: {
        type: Sequelize.STRING
      },
      ar: {
        type: Sequelize.STRING
      }
    });
  
    return Products;
  };
  