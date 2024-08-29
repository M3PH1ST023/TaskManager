import TaskModel from "../models/TaskModel.js";

export const addTask = async (req, res) => {
    try {
        let { title, description, completed } = req.body;
        let existingTask = await TaskModel.find({ title: title });

        if (existingTask[0] !== undefined) {
            res.json({
                status: "Error",
                message: "Task title already exists !",
            });
        } else {
            let task = new TaskModel({
                title,
                description,
                completed,
            });
            await task.save();
            res.json({
                status: "Success",
                message: "Task added !",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        let task = await TaskModel.find({
            taskOwner: req.query.taskOwner,
            priority: req.query.priority,
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        let { title, description, completed } = req.body;
        let task = await TaskModel.findByIdAndUpdate(req.params.id, {
            title,
            description,
            completed,
        });
        if (task) {
            res.json({
                status: "Success",
                message: "Task updated !",
            });
        } else {
            res.json({
                status: "Error",
                message: "Please try again !",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        let task = await TaskModel.findByIdAndDelete(req.params.id);
        res.json({
            status: "Success",
            message: "Task deleted !",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
