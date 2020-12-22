const express = require("express");
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
  // write your codes here
  try {
    const id = req.params.id;
    const type = req.query.type;

    if (type === "soft") {
      // const value = true;
      const studentData = await Student.findById(id);
      console.log(studentData.isDeleted);
      if (studentData.isDeleted === true) {
        res.status(404).send("record not found");
      } else {
        studentData.isDeleted = "true";
        await studentData.save();
        res.status(200).send("data is updated");
      }
    } else if (type === "hard") {
      const studentData = await Student.findByIdAndDelete(id);
      if (studentData === null) {
        res.status(404).send("data does not exist");
      } else {
        res.status(200).send("data is Deleted");
      }
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = app;
