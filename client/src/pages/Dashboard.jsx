import { useEffect, useState } from "react";
import Assets from "../Assets";
import axios from "axios";
import AddTask from "../components/AddTask";
import { useTaskContext } from "../context/TaskContext";
import EditTask from "../components/EditTask";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
    const { toggleAddFormDisplay, toggleEditFormDisplay } = useTaskContext();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios
            .get(Assets.server + "/api/v1/task")
            .then((resp) => setTasks(resp.data))
            .catch((err) => console.error(err));
    }, []);

    const handleCompletion = (id) => {
        axios
            .patch(Assets.server + "/api/v1/task/" + id, { completed: true })
            .then((resp) => {
                if (resp.data.status == "Success" && resp.data.message) {
                    toast.success(resp.data.message);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2500);
                }
            });
    };

    const handleDelete = (id) => {
        const choice = prompt("Confirm to delete [Y] / [N] : ");
        if (choice == "Y" || choice == "y") {
            axios.delete(Assets.server + "/api/v1/task/" + id).then((resp) => {
                if (resp.data.status == "Success" && resp.data.message) {
                    toast.success(resp.data.message);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2500);
                }
            });
        }
    };

    return (
        <div className="page-container">
            <ToastContainer theme="colored" autoClose={2000} />
            <div className="profile flex">
                Welcome &nbsp; <div>User</div> &nbsp; !
            </div>

            <div className="tasks-container flex f-column">
                <h3>My Tasks</h3>
                <div className="tasks flex f-wrap">
                    {tasks.map((task) => {
                        if (!task.completed)
                            return (
                                <div className="task flex f-column">
                                    <div className="title">{task.title}</div>
                                    <div className="description">
                                        {task.description}
                                    </div>
                                    <div className="icon flex f-between">
                                        <img
                                            src={Assets.images.done}
                                            onClick={() => {
                                                handleCompletion(task._id);
                                            }}
                                        />
                                        <img
                                            src={Assets.images.edit}
                                            onClick={() => {
                                                toggleEditFormDisplay(task);
                                            }}
                                        />
                                        <img
                                            src={Assets.images.bin}
                                            onClick={() =>
                                                handleDelete(task._id)
                                            }
                                        />
                                    </div>
                                </div>
                            );
                    })}
                </div>
                <h3>Completed tasks</h3>
                <div className="tasks-completed flex f-wrap">
                    {tasks.map((task) => {
                        if (task.completed)
                            return (
                                <div className="task flex f-column">
                                    <div className="title">{task.title}</div>
                                    <div className="description">
                                        {task.description}
                                    </div>
                                    <div className="icon flex f-between">
                                        <img
                                            src={Assets.images.bin}
                                            onClick={() =>
                                                handleDelete(task._id)
                                            }
                                        />
                                    </div>
                                </div>
                            );
                    })}
                </div>
            </div>

            <AddTask />
            <EditTask />

            <div className="icons">
                <img
                    src={Assets.images.add}
                    onClick={() => toggleAddFormDisplay()}
                />
            </div>
        </div>
    );
};

export default Dashboard;
