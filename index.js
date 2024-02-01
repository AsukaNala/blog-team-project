require("dotenv").config();
const express = require("express");

//Handlebars
const handlebars = require("express-handlebars");

//Errorhandlers
const {
  handleInvalidJson,
  handleUnauthorized,
  handleNotFound,
  handleAllOtherErrors,
} = require("./errors/errorHandler");

// Logging
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

//for frontend
const userController = require("./controllers/userController");

// Express
const app = express();

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
//Sets handlebars configurations
app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "main",
    extname: "hbs",
  })
);

// Middleware
app.use(express.json());

// Static files
app.use(express.static("public"));

// Logging
app.use(morganMiddleware);

// Swagger
if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerSpec = require("./swagger/swaggerSpec");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

//front end route
app.get("/", (req, res) => {
  //res.send("Hello World!");
  res.render("main", { layout: "index" });
});
//front end users route
app.get("/users", async (req, res) => {
  const users = await userController.getUsers();
  // console.log(users);
  res.render("user", { layout: "index", users: users });
});

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// add post routes
app.use("/api/posts", require("./routes/postRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.debug(`Example app listening on port ${port}!`);
});
