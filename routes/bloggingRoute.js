const express = require("express");
const userRouter = express.Router();
const { CreatePost, ReadPost, UpdatePost, DeletePost } = require("../controllers/bloggingControllers");
const {generateToken,authenticateToken} = require("../controllers/authToken");

userRouter.get("/generateToken",generateToken);
userRouter.post("/authenticateToken",authenticateToken);
userRouter.post("/CreatePost",authenticateToken, CreatePost);
userRouter.get("/ReadPost",authenticateToken, ReadPost);
userRouter.put("/UpdatePost",authenticateToken, UpdatePost);
userRouter.delete("/DeletePost",authenticateToken, DeletePost);

module.exports = userRouter;
