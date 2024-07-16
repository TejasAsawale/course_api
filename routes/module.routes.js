import express from "express";
import moduleController from "../controller/module.controller.js";

const moduleRoutes = express.Router();

moduleRoutes.post("/",moduleController.createModule);
moduleRoutes.get("/",moduleController.getAllModules);
moduleRoutes.put("/:id",moduleController.updateModule);
moduleRoutes.delete("/:id",moduleController.deleteModule);

moduleRoutes.patch("/:id/assignLecture", moduleController.assignLecture);
moduleRoutes.get("/:id/lecture",moduleController.getModuleLecture);

export default moduleRoutes;