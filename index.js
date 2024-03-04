const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth.middleware')

const urlRoute = require("./routes/user.route");
const staticRoute = require("./routes/static.route");
const authRoute = require("./routes/auth.route")

const { connectDatabase } = require("./database/connection");
const { URL } = require("./models/user.model");

const app = express();
const PORT = 3333;

connectDatabase("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/auth", authRoute)

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`App Listening in Port : ${PORT}`));
