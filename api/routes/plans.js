const router = require('express').Router();
const Plan = require('../models/plans');
const Task = require('../models/tasks');

router.route('/').get((req, res) => {
    Plan.find( {userId: req.header('userId')})
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Plan.remove()
        .then(plans => res.json("All removed"))
        .catch(err => res.status(400).json('Error: ' + err));
});


//adding the plan
router.route('/').post((req, res) => {

    const planName = req.body.planName;
    const tasks = req.body.tasks;
    const userId = req.body.userId;
    //   plan.date = Date.parse(req.body.date);
    const newPlan = new Plan({ userId, planName, tasks });

    newPlan.save()
        .then(() => res.json(newPlan))
        .catch(err => res.status(400).json('error is here' + err));
});


// updating plan title
router.route('/:plan_id').put((req, res) => {
    Plan.findById(req.params.plan_id).updateOne(
        { "$set": { "planName": req.body.planName } }
    )
    .then(() => { res.send('Plan title updated!')
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



//display all the plans
router.route('/:id').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error: ' + err));
});

//deleting a plan
router.route('/:id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Plan deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * updates an existing plan item. 
 * For this endpoint, we first retrieve the old plan item from the database based on the id. 
 * Then, we set the plan property values to what’s available in the request body. 
 * Finally, we call plan.save to save the updated object in the database.
 */
router.route('/:id').put((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => {
            plan.plaName = req.body.planName;
            plan.save()
                .then(() => res.json('plan updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// updating task
router.route('/:plan_id/tasks/:task_id').put((req, res) => {
    Plan.findById(req.params.plan_id).updateOne(

        { "tasks._id": req.params.task_id },
        { "$set": { "tasks.$": req.body } }

    )
    .then(() => { res.send('Task updated!')
    //    Plan.findOne({_id: req.params.plan_id}, (err,foundPlan)=>{
    //         res.json(foundPlan.tasks)  // attempt to grab the task with new id
    //    })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});





// deleting task
router.route('/:plan_id/tasks/:task_id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.plan_id).update({ "$pull": { tasks: { "_id": req.params.task_id } } }
)
    .then(() => res.json('Task deleted.'))
     .catch(err => res.status(400).json('Error: ' + err));
});



//add task
router.route('/:plan_id/tasks').post((req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.description;
    const taskDuration = req.body.duration;

    const task = new Task({
        taskName: taskName,
        description: taskDescription,
        duration: taskDuration,
        planId: req.params.plan_id
    });
    
    Plan.findOne({_id: req.params.plan_id}, (err,foundPlan)=>{
      foundPlan.tasks.push(task)
      foundPlan.save()
    .then(() => res.json(task))
    .catch(err => res.status(400).json('error is here' + err));
      
    })

});

module.exports = router;