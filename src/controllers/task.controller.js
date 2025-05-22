export class TaskController {
  constructor({ taskModel }) {
    this.taskModel = taskModel;
  }

  // Get all tasks
  readTask = async (req, res) => {
    try {
      const tasks = await this.taskModel.Read();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  };

  // Create a new task
  createTask = async (req, res) => {
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be a boolean" });
    }

    try {
      const task = await this.taskModel.create({
        taskData: { title, completed },
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  };

  // Update a task
  updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    if (!title && typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "Title or Completed must be provided" });
    }

    try {
      const task = await this.taskModel.update({
        taskData: { id, title, completed },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };

  // Delete a task
  deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    try {
      const task = await this.taskModel.delete({ taskData: { id } });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  };
}
