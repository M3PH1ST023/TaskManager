import mongoose from "mongoose";

const Database = (connectionUrl) => {
    mongoose.connect(connectionUrl);

    let db = mongoose.connection;

    db.on("connected", () => {
        console.log("Database connected ...");
    });

    db.on("error", () => {
        console.log("Error connecting database ...");
    });

    return db;
};

export default Database;
