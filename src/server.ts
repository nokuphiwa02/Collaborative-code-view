import express from "express";
import dotenv from "dotenv";
import { testDbConnection } from "./config/database";
import authRoutes from './routes/authoRoutes'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await testDbConnection();
  app.use(express.json());
  app.use("/api/auth", authRoutes);

  testDbConnection();
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:5000");
  });
};
startServer();
