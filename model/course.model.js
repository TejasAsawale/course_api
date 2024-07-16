import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
	name: {
		type: "String",
		require: true,
	},
	description: {
		type: "String",
	},
	modules: [
        {
            index: {
                type: "Number"
            },
            moduleId : {
                type: "String"
            }
        }
    ],
    // AssignToStudent: [{},{}]
});

export default mongoose.model("course", courseSchema);
