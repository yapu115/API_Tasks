import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);
const taskSchema = new mongoose.Schema(
  {
    _id: Number,
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

taskSchema.plugin(AutoIncrement, { id: "task_seq", inc_field: "_id" });
const Task = mongoose.model("Task", taskSchema);

export class TaskModel {
  // Get all tasks
  static async Read() {
    const tasks = await Task.find();
    return tasks;
  }

  // Create a new task
  static async create({ taskData }) {
    const { title, completed } = taskData;

    const newTask = new Task({
      title,
      completed,
    });

    await newTask.save();
    return newTask;
  }

  // Update a task
  static async update({ taskData }) {
    const { id, title, completed } = taskData;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    return updatedTask;
  }

  // Delete a task
  static async delete({ taskData }) {
    const { id } = taskData;

    const deletedTask = await Task.findByIdAndDelete(id);

    return deletedTask;
  }
}
