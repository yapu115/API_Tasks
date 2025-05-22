import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { taskRouter } from "./routes/task.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const createApp = ({ taskModel }) => {
  // Load environment variables from .env file
  dotenv.config();

  // Initialize express app
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Swagger options
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task API",
        version: "1.0.0",
        description: "API for managing tasks",
      },
    },
    apis: ["./src/routes/*.js"],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes
  app.use("/tasks", taskRouter({ taskModel }));

  // MongoDB connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  // error
  app.use((err, res) => {
    res.status(500).send("Server error");
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};
