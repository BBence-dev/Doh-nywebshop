const controller = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.get("/api/test/orders", controller.findAll);
app.post("/api/test/orders", controller.create);
app.get("/api/test/orders/:id", controller.findOne);
app.put("/api/test/orders/:id", controller.update);
app.delete("/api/test/orders/:id", controller.delete);
app.delete("/api/test/orders", controller.deleteAll);

};