const { Router } = require("express");
const {
  registerUser,
  postRol,
  getAllUsers,
  infoUser,
  loginUser,
  renewJWT,
  googleAuth,
  getRol,
  getRols,
  changeRol,
  modifyUser,
  deleteUser,
  verifyPassword,
} = require("../controllers/authControllers");
const { validBodyLogin } = require("../middlewares/validBodyLogin");
const { validBodyPostUser } = require("../middlewares/validBodyPostUser");
const { validIdParam } = require("../middlewares/validIdParam");
const { validJWT } = require("../middlewares/validJWT");
const authRoutes = Router();

authRoutes.post("/rol", postRol);
authRoutes.get("/rol", getRols);
authRoutes.get("/rol/:id", validIdParam, getRol);
authRoutes.put("/changerol/:id", validIdParam, changeRol);

authRoutes.post("/signup", validBodyPostUser, registerUser);
authRoutes.post("/signin", validBodyLogin, loginUser);
authRoutes.get("/users", getAllUsers);
authRoutes.get("/users/:id", validIdParam, infoUser);

authRoutes.get("/renew", validJWT, renewJWT);
authRoutes.put("/password/:id", validIdParam, verifyPassword);
authRoutes.post("/google", googleAuth);
authRoutes.put("/users/:id", validIdParam, modifyUser);
authRoutes.delete("/users/:id", validIdParam, deleteUser);

module.exports = { authRoutes };
