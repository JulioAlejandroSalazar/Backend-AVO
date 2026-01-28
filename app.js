require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const solicitudesController = require("./controllers/solicitudes.controller");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.get("/solicitudes", solicitudesController.listarSolicitudesSSR);

app.use("/api/auth", require("./routes/auth.routes"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: "error", 
        message: err.message,
        time: new Date().toISOString(),
        task_id: require('uuid').v4()
    });
});

app.use("/api/solicitudes", require("./routes/solicitudes.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});