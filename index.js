const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./model/todomodel')

app.use(express.json())

// MONGO_URI=mongodb+srv://class-04:pRUpbOTxt6mHDJEF@cluster0.lrortll.mongodb.net/todo
mongoose.connect("mongodb+srv://class-04:pRUpbOTxt6mHDJEF@cluster0.lrortll.mongodb.net/todo").then(()=> console.log("connected!!"));


//Create task
app.post('/create/todo', (req, res) => {
  let { task, priority } = req.body
  if (!task) {
    return res.status(400).send("task dew")
  }

  let todo = new Task({
    task: task,
    priority: priority
  }).save()
  res.send(todo)
});
// Show tasks
app.get('/all/tasks', async (req, res) => {
  let data = await Task.find({})
  res.send(data)
})
// Delete
app.delete('/delete/:id',async (req, res) => {
  const {id} = req.params
  await Task.findByIdAndDelete(id);
  res.sand("delete")
})
// Update
app.post('/update/:id',async (req, res) => {
  const {id} = req.params
  let update = await Task.findByIdAndUpdate({_id: id}, req.body,{new: true});
  res.sand("update")
})


app.listen(5000, () => {
  console.log(`server connected`)
})
