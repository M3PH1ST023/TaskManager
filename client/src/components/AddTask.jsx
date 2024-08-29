import { toast, ToastContainer } from "react-toastify";
import { useTaskContext } from "../context/TaskContext";
import axios from "axios";
import Assets from "../Assets";

const AddTask = () => {
    const { toggleAddFormDisplay, addFormDisplay } = useTaskContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            title: document.getElementById("addTitle").value.toLowerCase(),
            description: document
                .getElementById("addDescription")
                .value.toLowerCase(),
        };
        axios
            .post(Assets.server + "/api/v1/task", body)
            .then((resp) => {
                if (resp.data.status == "Success" && resp.data.message) {
                    toast.success(resp.data.message);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2500);
                } else {
                    toast.error(resp.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div
            className="task-form-container flex f-center"
            style={{ display: addFormDisplay ? "" : "none" }}
        >
            <form
                onSubmit={handleSubmit}
                className="form flex f-column f-center"
            >
                <div className="close" onClick={() => toggleAddFormDisplay()}>
                    X
                </div>
                <h2>Add Task</h2>
                <div className="inp flex f-column">
                    <label>Task title</label>
                    <input type="text" id="addTitle" />
                </div>
                <div className="inp flex f-column">
                    <label>Task Description</label>
                    <input type="text" id="addDescription" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddTask;
