import express from "express";
import lectureController from "../controller/lecture.controller.js";

const lectureRoutes = express.Router();

lectureRoutes.post("/",lectureController.createLecture);
lectureRoutes.get("/:id",lectureController.getAllLectures);
lectureRoutes.put("/:id",lectureController.updateLecture);
lectureRoutes.delete("/:id",lectureController.deleteLecture);

export default lectureRoutes;
