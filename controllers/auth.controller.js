const Auth = require("../models/auth.model");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.service");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await Auth.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
