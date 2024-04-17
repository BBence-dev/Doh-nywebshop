const controller = require("../controllers/products.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.get("/api/test/products", controller.findAll);
app.get("/api/test/products", controller.create);
app.get("/api/test/products", controller.findOne);
app.get("/api/test/products", controller.update);
app.get("/api/test/products", controller.delete);
app.get("/api/test/products", controller.deleteAll);

};