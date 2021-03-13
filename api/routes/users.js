const router = require('express').Router();
const User = require('../models/user');
const moment = require('moment');

router.route('/').get((req, res) => {
  const role = req.query.role;
  let query = User.find();

  if (role) {
    query = query.where('roles').equals(role);
  }
  query
    .select('-password')
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/students').get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      let students = [];
      if (user.students) {
        const studentsNumber = user.students.length;
        user.students.map((studentId, i) => {
          User.findById(studentId)
            .then((student) => {
              students.push(student);
              if (i === studentsNumber - 1) {
                res.json(students);
              }
            })
            .catch((err) => res.status(400).json('Error: ' + err));
        });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/students/:student_id').put((req, res) => {
  const studentId = req.params.student_id;
  User.findById(req.params.id, (error, user) => {
    if (user.students) {
      let includes = false;
      for (i = 0; i < user.students.length; ++i) {
        if (studentId == user.students[0]) {
          includes = true;
        }
      }
      if (!includes) {
        user.students.push(studentId);
      }
    } else {
      user.students = [];
      user.students.push(studentId);
    }
    user.save();
  })
    .then((user) => {
      res.json('Student added!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/time').put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const today = moment().format('MM-DD-YYYY');
      const dateForChangeIndex = user.totaltime.findIndex((day) => {
        return day.date == today;
      });

      if (dateForChangeIndex === -1) {
        user.totaltime.push({ date: today, time: 0 });
      } else {
        user.totaltime[dateForChangeIndex].time += 3;
      }
      user.save();
      res.json('Started');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
