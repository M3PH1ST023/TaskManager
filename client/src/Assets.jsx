import "react-toastify/dist/ReactToastify.css";

import "./assets/css/global.css";
import "./assets/css/pages/pages.css";
import "./assets/css/pages/auth/auth.css";

import add from "./assets/images/add.png";
import logout from "./assets/images/logout.png";
import done from "./assets/images/done.png";
import edit from "./assets/images/edit.png";
import bin from "./assets/images/bin.png";

const Assets = {
    server: "http://localhost:5000",
    images: {
        add: add,
        logout: logout,
        edit: edit,
        done: done,
        bin: bin,
    },
};

export default Assets;
