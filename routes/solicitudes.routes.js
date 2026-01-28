const express = require("express");
const router = express.Router();
const controller = require("../controllers/solicitudes.controller");

// API
router.post("/", controller.crearSolicitud);
router.get("/", controller.listarSolicitudes);

// SSR
router.get("/ssr", controller.listarSolicitudesSSR);

module.exports = router;
