import express from "express";
import userController from "../controller/user.controller.js"

const userRoutes = express.Router();

userRoutes.post("/", userController.registerUser);
userRoutes.get("/:id", userController.getUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

userRoutes.patch("/:id/assignCourse", userController.assignCourse);
userRoutes.get("/:id/course", userController.getUserCourse);
// userRoutes.put("/:id/course",userController.updateUserCourse);
// userRoutes.delete("/:id/deleteCourse",userController.deleteCourse);

export default userRoutes;