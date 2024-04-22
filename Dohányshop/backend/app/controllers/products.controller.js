const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Létrehozás és mentés termék
exports.create = (req, res) => {
  // Kérés ellenörzése
  if (!req.body.nev) {
    res.status(400).send({
      message: "A tartalom nem lehet üres!"
    });
    return;
  }

  // Termék létrehozása
  const products = {
    nev: req.body.nev,
    url: req.body.url,
    db: req.body.db,
    ar: req.body.ar,
  };

  // Termék adatbázisba mentése
  Product.create(products)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba történt a felhasználó létrehozásakor."
      });
    });
};

// A termékek lekérdezése az adatbázisból
exports.findAll = (req, res) => {
  const title = req.query.nev;
  var condition = title ? { nev: { [Op.like]: `%${nev}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hibar történt az adatok lekérdezésekor"
      });
    });
};

// Egy termék lekérdezése id alapján
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nem található ilyen termék ezzel az idval=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Termék lekérdezése nem sikrült" + id
      });
    });
};

// Termék módositása id azonositásal
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Termék sikeresen frissitve."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

/*
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/