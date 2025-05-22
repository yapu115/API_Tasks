import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export const taskRouter = ({ taskModel }) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Task:
   *       type: object
   *       required:
   *         - title
   *       properties:
   *         title:
   *           type: string
   *           description: Task title
   *         completed:
   *           type: boolean
   *           description: Task completion status
   *       example:
   *         title: Implement Swagger
   *         completed: false
   */
  const taskRouter = Router();

  const taskController = new TaskController({ taskModel });

  /**
   * @swagger
   * /tasks/:
   *   get:
   *     summary: Get all tasks
   *     tags: [Tasks]
   *     responses:
   *       200:
   *         description: Task list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       500:
   *        description: Internal server error
   */
  taskRouter.get("/", taskController.readTask);

  /**
   * @swagger
   * /tasks/:
   *   post:
   *     summary: Create a new task
   *     tags: [Tasks]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Task'
   *     responses:
   *       201:
   *         description: Task created
   *         content:
   *          application/json:
   *           schema:
   *             $ref: '#/components/schemas/Task'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   *
   */
  taskRouter.post("/", taskController.createTask);

  /**
   * @swagger
   * /tasks/{id}:
   *   put:
   *     summary: Update a task by ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the task to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Task'
   *     responses:
   *       200:
   *         description: Task updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  taskRouter.put("/:id", taskController.updateTask);

  /**
   * @swagger
   * /tasks/{id}:
   *   delete:
   *     summary: Delete a task by ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the task to delete
   *     responses:
   *       200:
   *         description: Task deleted
   *       404:
   *         description: Task not found
   *       500:
   *         description: Internal server error
   */

  taskRouter.delete("/:id", taskController.deleteTask);

  return taskRouter;
};
