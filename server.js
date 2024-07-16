import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import moduleRoutes from "./routes/module.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/lecture',lectureRoutes);

// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port", PORT));