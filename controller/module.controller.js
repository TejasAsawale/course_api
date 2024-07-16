import lectureModel from "../model/lecture.model.js";
import moduleModel from "../model/module.model.js";

// Create a new module
const createModule = async (req, res) => {
    try {
        const module = new moduleModel(req.body);
        await module.save();
        res.status(201).send(module);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Read the all modules
const getAllModules = async (req, res) => {
    try {
        const modules = await moduleModel.find().populate("lectures");
        res.send(modules);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update a existing module
const updateModule = async (req, res) => {
    try {
    const module = await moduleModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });
        if (!module) return res.status(404).send({ message: "Module not found" });
        res.json(module);
    } catch (error) {
    res.status(400).send({ message: error.message });
    }
};

// Delete an existing module
const deleteModule = async (req, res) => {
    try {
        const module = await moduleModel.findByIdAndDelete(req.params.id);
            if (!module) return res.status(404).send({ message: "Module not found" });
                res.send({ message: "Module deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const assignLecture = async (req, res) => {
	const ModuleId = req.params.id;

	const module = await moduleModel.findOne({ _id: ModuleId });

	if (!module) {
		res.status(404).send({ message: "Unknown moduleId" });
	} else {
		const lecture = await lectureModel.findById(req.body.lectureId);
		if (!lecture) {
			res.status(404).send({ message: "Unknown lectureId" });
		} else {
			const lectures = [req.body.lectureId];

			module.lecture = lectures;

			const updateModule = await module.save();

			if (updateModule) {
				res.status(200).send(updateModule);
			}
		}
	}
};

const getModuleLecture = async (req, res) => {
	const moduleId = req.params.id;

	const module = await moduleModel.findOne({ _id: moduleId }, {_id : 0});

	if (module) {
		res.status(200).send(module);
	} else {
		res.status(404).send({ message: "Unknown moduleId" });
	}
};

export default {
    createModule,
    getAllModules,
    updateModule,
    deleteModule,
    assignLecture,
    getModuleLecture
}