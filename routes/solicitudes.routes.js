const express = require("express");
const router = express.Router();
const controller = require("../controllers/solicitudes.controller");

// API CRUD
router.post("/", controller.crearSolicitud);
router.get("/", controller.listarSolicitudes);
router.put("/:id", controller.actualizarSolicitud);
router.delete("/:id", controller.eliminarSolicitud);

// SSR
router.get("/ssr", controller.listarSolicitudesSSR);

module.exports = router;
