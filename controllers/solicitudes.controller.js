const { solicitudes, generarId } = require("../data/solicitudes");

function crearSolicitud(req, res) {
  const {
    dni,
    nombreCliente,
    origen,
    destino,
    tipoViaje,
    email,
    fechaSalida,
    fechaRegreso,
    estado
  } = req.body;

  if (!dni || !nombreCliente || !origen || !destino || !email) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
  }

  const nueva = {
    id: generarId(),
    dni,
    nombreCliente,
    origen,
    destino,
    tipoViaje,
    email,
    fechaSalida,
    fechaRegreso,
    estado: estado || "pendiente",
    fechaRegistro: new Date().toLocaleString()
  };

  solicitudes.push(nueva);
  res.status(201).json(nueva);
}

function listarSolicitudes(req, res) {
  res.json(solicitudes);
}

function actualizarSolicitud(req, res) {
  const id = Number(req.params.id);
  const index = solicitudes.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Solicitud no encontrada" });
  }

  solicitudes[index] = {
    ...solicitudes[index],
    ...req.body
  };

  res.json(solicitudes[index]);
}

function eliminarSolicitud(req, res) {
  const id = Number(req.params.id);
  const index = solicitudes.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Solicitud no encontrada" });
  }

  solicitudes.splice(index, 1);
  res.json({ message: "Solicitud eliminada correctamente" });
}

function listarSolicitudesSSR(req, res) {
  res.render("solicitudes", { solicitudes });
}

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  actualizarSolicitud,
  eliminarSolicitud,
  listarSolicitudesSSR
};
