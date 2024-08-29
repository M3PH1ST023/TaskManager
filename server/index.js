import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "./src/config/Database.js";
import TaskRouter from "./src/api/routers/TaskRouters.js";

dotenv.config();

const app = express();
const port = 5000;
const database = Database(process.env.MONGO_URL);

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
    })
);

app.use("/api/v1/task", TaskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
