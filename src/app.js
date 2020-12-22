const express = require("express");
const { findByIdAndDelete } = require("./models/Student");
const Student = require("./models/Student");

const app = express();

// middleware
app.use(express.json());

// Routes

// Get all the students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Add student to database
app.post("/students", async (req, res) => {
  // write your codes here

  try {
    const studentData = new Student({
      name: req.body.name,
      sex: req.body.sex,
      age: req.body.age,
      class: req.body.class,
      grade_point: req.body.grade_point,
    });
    await studentData.save();
    res.send(studentData);
  } catch (error) {
    res.status(404).send("error");
  }
});

// Get specific student
app.get("/students/:id", async (req, res) => {
  // write your codes here
  try {
    const id = req.params.id;
    const studentData = await Student.findById(id);
    res.send(studentData);
  } catch (err) {
    res.send(err);
  }
});

// delete specific student
app.delete("/students/:id", async (req, res) => {
  // const id = req.params.id;
  // const type = req.query.type;

  // if (type === "soft") {
  //   const studentData = await Student.updateOne(
  //     { _id: id },
  //     { isDeleted: true }
  //   );
  //   if (studentData.nModified === 1) {
  //     res.status(200).send("Record is Updated");
  //   } else {
  //     res.status(404).send("Record Does Not Exist");
  //   }
  // } else if (type === "hard") {
  //   const studentData = await Student.deleteOne({ _id: id });
  //   if (studentData.deletedCount === 0) {
  //     res.status(404).send("Record Does Not Exist");
  //   } else {
  //     res.send("Record is Deleted");
  //   }
  // }
  if (req.query.type.toLowerCase() === "soft") {
    await Student.updateOne({ _id: req.params.id }, { isDeleted: true });
  } else if (req.query.type.toLowerCase() === "hard") {
    await Student.deleteOne({ _id: req.params.id });
  }
  res.sendStatus(200);
});

module.exports = app;
