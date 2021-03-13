const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    name: { type: String, required: true },
    description:  String,
    classType: { type: String, enum: [ 'group', 'single' ], required: true, default: 'single' },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    teacher: { type: Schema.Types.ObjectId, ref : 'User', required: true },
    students: [{ 
        student : { type : Schema.Types.ObjectId, ref : 'User' },
        requestor : { type : Schema.Types.ObjectId, ref : 'User', required: true },
        requestStatus: { type: String, enum: [ 'approved', 'pending', 'rejected' ], default: 'pending' } 
    }],
    level: { type: String, enum: [ 'novice', 'intermediate', 'expert' ]},
    capacityMax: { type: Number, default: 1},
}, { timestamps: true });

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;