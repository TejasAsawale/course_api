import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
	name: {
		type: "String",
		require: true,
	},
	mobile: {
		type: "Number",
		require: true,
		unique: true,
	},
	role: {
		type: "String",
		enum: ["STUDENT", "TEACHER"],
		require: true,
	},
	password: {
		type: "String",
		require: true,
	},
    course: [
        {
            type: "String"
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("user", userSchema);
