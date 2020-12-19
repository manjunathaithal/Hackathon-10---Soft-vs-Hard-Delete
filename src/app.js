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
  const { name, sex, age, classes, grade_point } = req.body;
  console.log(classes);
  try {
    const studentData = new Student({
      name,
      sex,
      age,
      class: classes,
      grade_point,
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
    console.log(id, type);
    if (type === "soft") {
      // const value = true;
      const studentData = await Student.findById(id);

      studentData.isDeleted = "true";
      studentData.save();
      res.send("Data is Updated");
    } else if (type === "hard") {
      Student.collection.drop();
      res.send("Collection is Dropped");
    }
  } catch (err) {
    res.status(404).send("error");
  }
});

module.exports = app;
