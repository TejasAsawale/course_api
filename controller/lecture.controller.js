import lectureModel from "../model/lecture.model.js";

// Create a new lecture
const createLecture = async (req, res) => {
    try {
        const lecture = new lectureModel(req.body);
        const result = await lecture.save();
        res.status(200).send({message:"Lecture created newly...", task: result});
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read/get the lectures
const getAllLectures = async (req, res) => {
    try {
        const lectures = await lectureModel.find({},{__v:0});
        res.status(200).send(lectures);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a lecture
const updateLecture = async (req, res) => {
    try {
        const lecture = await lectureModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        if (!lecture) {
            res.status(400).send({ message: "Lecture not found here" });
        }
        res.status(200).send({message:"Lecture updated successfully"})
        } catch (error) {
            res.status(500).json(error);
    }
};

// Delete a lecture
const deleteLecture = async (req, res) => {
    try {
        const lecture = await lectureModel.findByIdAndDelete(req.params.id);
        if (!lecture) {
            res.status(400).send({ message: "Lecture not found here" });
        }
        res.status(200).send({ message: "Lecture deleted successfully" });
    } catch (error) {
    res.status(500).json(error);
    }
};

export default {
    createLecture,
    getAllLectures,
    updateLecture,
    deleteLecture
}
