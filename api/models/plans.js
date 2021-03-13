const mongoose = require('mongoose');
const taskSchema = require('./tasks').schema;


const Schema = mongoose.Schema;

const planSchema = new Schema(

    {
        userId: { type: String, required: true },
        planName: { type: String, required: true },
        tasks: [taskSchema]
    },

    {
        timestamps: true,
    }
);


const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;

