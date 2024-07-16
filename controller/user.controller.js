import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

import dotenv from "dotenv";
import courseModel from "../model/course.model.js";
dotenv.config();

const loginUser = async(req,res) => {
	
}

const registerUser = async (req, res) => {
	const { name, mobile, role } = req.body;

	try {
		const existingUser = await userModel.findOne({ mobile });

		if (!existingUser) {
			const user = new userModel({ name, mobile, role });
			const createdUser = await user.save();
			if (createdUser) {
				res.status(201).send(createdUser);
			}
		} else {
			console.log("User already exists. User Request :", req.body);
			res.status(400).send({
				message: "User already exists",
			});
		}
	} catch (e) {
		if (
			e.name == "ValidationError" &&
			e._message == "user validation failed"
		) {
			res.status(400).send({ message: "User role is unknown" });
		}
		res.status(500).send(e);
	}
};

const getUser = async (req, res) => {
	const userId = req.params.id;

	const user = await userModel.findOne({ _id: userId });

	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send({ message: "Unknown userId" });
	}
};

const updateUser = async (req, res) => {
	const userId = req.params.id;

	const user = await userModel.findOne({ _id: userId });

	if (!user) {
		res.status(404).send({ message: "Unknown userId" });
	} else {
		user.name = req.body.name;
		user.mobile = req.body.mobile;
		user.role = req.body.role;

		const updateUser = await user.save();

		if (updateUser) {
			res.status(200).send(updateUser);
		}
	}
};

async function deleteUser(req,res){
	const id = req.params.id;
	try {
		const user = await userModel.findByIdAndDelete(id);
		if(!user){
			res.status(400).send({message : 'User not found'});
		}else{
		res.status(200).send({message : 'User Deleted',user});
	}
} catch (error) { 
		res.status(500).send(error);
	}
}


const assignCourse = async (req, res) => {
	const userId = req.params.id;

	const user = await userModel.findOne({ _id: userId });

	if (!user) {
		res.status(404).send({ message: "Unknown userId" });
	} else {
		const course = await courseModel.findById(req.body.courseId);
		if (!course) {
			res.status(404).send({ message: "Unknown courseId" });
		} else {
			const courses = [req.body.courseId];

			user.course = courses;

			const updateUser = await user.save();

			if (updateUser) {
				res.status(200).send(updateUser);
			}
		}
	}
};

const getUserCourse = async (req, res) => {
	const userId = req.params.id;

	const user = await userModel.findOne({ _id: userId }, {_id : 0, course: 1});

	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send({ message: "Unknown userId" });
	}
};


export default { 
	registerUser,
	getUser,
	updateUser, 
	deleteUser,
	assignCourse, 
	getUserCourse,	
	
};
