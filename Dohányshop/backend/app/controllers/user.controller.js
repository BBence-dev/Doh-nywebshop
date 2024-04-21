const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nev) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const user = {
    nev: req.body.nev,
    username: req.body.username,
    password: req.body.password,
    kor: req.body.kor,
    szhely: req.body.szhely,
    status: req.body.status
  
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nev = req.query.nev;
  var condition = nev ? { nev: { [Op.like]: `%${nev}%` } } : null;

  User.findAll({ where: condition , include: Role })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: Role})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;
  
  // Ellenőrizzük, hogy van-e Role id a requestben
  if (!req.body.roleId) {
    return res.status(400).send({
      message: "A roleId is required to update the user's role."
    });
  }

  User.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User with id=${id} not found.`
        });
      }

      // Most módosítsuk a User-t
      user.update(req.body)
        .then(() => {
          // Majd módosítsuk a Role-t is
          Role.findByPk(req.body.roleId)
            .then(role => {
              if (!role) {
                return res.status(404).send({
                  message: `Role with id=${req.body.roleId} not found.`
                });
              }
              user.setRole(role)
                .then(() => {
                  res.send({
                    message: "User and associated role were updated successfully."
                  });
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Error updating user's role."
                  });
                });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error finding role with id=" + req.body.roleId
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error finding user with id=" + id
      });
    });
};


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
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
  User.destroy({
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


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
