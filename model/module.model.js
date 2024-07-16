import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name:{type : String,require: true},
    description: {type: String},
    subject : {type : String},
    duration : {type : Number},
    lectures:[
        {
            index : {type : Number},
            lectureId : {type: String}
        }
    ]
});

export default mongoose.model("module", moduleSchema);

// {
//     "name":"JavaScript Basics",
//     "description":"This module explains the Introduction of JavaScript",
//     "subject":"JavaScript",
//     "duration":2,
//     "lectures":[
//         {
//             "index": 1,
//             "lectureId": "JS1"
//         },
//         {
//             "index": 2,
//             "lectureId": "JS2"
//         },
//         {
//             "index": 3,
//             "lectureId": "JS3"
//         }
//     ]
// }