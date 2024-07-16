import express from "express";
import courseController from "../controller/course.controller.js";

const courseRoutes = express.Router();

courseRoutes.post("/", courseController.createCourse);
courseRoutes.get("/:id", courseController.getCourseById);
courseRoutes.put("/:id", courseController.updateCourseById);
courseRoutes.delete("/:id", courseController.deleteCourseById);

courseRoutes.patch("/:id/assignModule", courseController.assignModule);
courseRoutes.get("/:id/module",courseController.getCourseModule);

export default courseRoutes;