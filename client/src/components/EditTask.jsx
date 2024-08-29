import { toast, ToastContainer } from "react-toastify";
import { useTaskContext } from "../context/TaskContext";
import axios from "axios";
import Assets from "../Assets";

const EditTask = () => {
    const { editFormDisplay, editData } = useTaskContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            title: document.getElementById("editTitle").value.toLowerCase(),
            description: document
                .getElementById("editDescription")
                .value.toLowerCase(),
        };
        axios
            .patch(Assets.server + "/api/v1/task/" + editData._id, body)
            .then((resp) => {
                if (resp.data.status == "Success" && resp.data.message) {
                    toast.success(resp.data.message);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2500);
                } else {
                    toast.error(resp.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div
            className="task-form-container flex f-center"
            style={{ display: editFormDisplay ? "" : "none" }}
        >
            <ToastContainer theme="colored" autoClose={2000} />
            <form
                onSubmit={handleSubmit}
                className="form flex f-column f-center"
            >
                <div
                    className="close"
                    onClick={() => window.location.reload(true)}
                >
                    X
                </div>
                <h2>Edit Task</h2>
                <div className="inp flex f-column">
                    <label>Task title</label>
                    <input
                        type="text"
                        id="editTitle"
                        defaultValue={editData.title}
                    />
                </div>
                <div className="inp flex f-column">
                    <label>Task Description</label>
                    <input
                        type="text"
                        id="editDescription"
                        defaultValue={editData.description}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditTask;
