import courseModel from "../model/course.model.js";
import moduleModel from "../model/module.model.js";

// create new course
const createCourse = async (req, res) => {
	const { name, description } = req.body;

	try {
		const course = new courseModel({ name, description });
		const createdCourse = await course.save();
		if (createdCourse) {
			res.status(201).send(createdCourse);
		}
	} catch (e) {
		res.status(500).send(e);
	}
};

// get course by id
const getCourseById = async (req, res) => {
    const courseId = req.params.id;

    const course = await courseModel.findOne({_id : courseId});

    if (course) {
        res.status(200).send(course);
    } else {
        res.status(404).send({message: "Unknown courseId"});
    }
}

// update course by id
const updateCourseById = async (req, res) => {
	const courseId = req.params.id;

	const course = await courseModel.findOne({ _id: courseId });

	if (!course) {
		res.status(404).send({ message: "Unknown courseId" });
	} else {
		course.name = req.body.name;
		course.description = req.body.description;

		const updateCourse = await course.save();

		if (updateCourse) {
			res.status(200).send(updateCourse);
		}
	}
};

// delete course by id
const deleteCourseById = async(req,res)=>{
    console.log(req.params.id);
    try{
        const course = await courseModel.findByIdAndDelete(req.params.id);
        if(!course){
            res.status(404).send({message:"Course not found"});
        }
        res.send({task:course,message:"Course deleted"})
    } catch(error) {
        res.status(500).send(error);
    }
};

const assignModule = async (req, res) => {
	const courseId = req.params.id;

	const course = await courseModel.findOne({ _id: courseId });

	if (!course) {
		res.status(404).send({ message: "Unknown courseId" });
	} else {
		const module = await moduleModel.findById(req.body.moduleId);
		if (!module) {
			res.status(404).send({ message: "Unknown ModuleId" });
		} else {
			const modules = [req.body.moduleId];

			course.module = modules;

			const updateCourse = await course.save();

			if (updateCourse) {
				res.status(200).send(updateCourse);
			}
		}
	}
};

const getCourseModule = async (req, res) => {
	const courseId = req.params.id;

	const course = await courseModel.findOne({ _id: courseId }, {_id : 0});

	if (course) {
		res.status(200).send(course);
	} else {
		res.status(404).send({ message: "Unknown courseId" });
	}
};

export default { 
	createCourse, 
	getCourseById, 
	updateCourseById,
	deleteCourseById,
	assignModule,
	getCourseModule
};
