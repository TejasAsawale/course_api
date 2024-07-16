import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    name: {type : String, require : true},
    description: {type: String},
    teacher: {type: String},
    mode: {type: String, enum : ["online","offline","webinar"]}
});

export default mongoose.model("lecture", lectureSchema);

// {
//     "name":"JavaScript Advance",
//     "description":"this course provides the basic to advance concepts of javascript",
//     "teacher":"gaurav",
//     "mode":"offline"
// }