require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const express = require("express");
// it helps us create different layouts which are reusable through many pages
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

// for authentication
// stores session in db , if user logs in  then he can be kept logged in
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

// initialize
const app = express();
const port = 5000 || process.env.PORT;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// connect to DB
connectDB();

// static files
app.use(express.static("public"));

// Templating engine
app.use(expressLayouts);
// default layout
app.set("layout", "./layouts/main.ejs");
app.set("view engine", "ejs");

// routes
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashboard"));

// handle 404 , this needs to be last route
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
