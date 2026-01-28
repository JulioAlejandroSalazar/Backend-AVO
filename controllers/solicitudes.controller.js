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
    estado,
    fechaRegistro: new Date().toLocaleString()
  };

  solicitudes.push(nueva);
  res.status(201).json(nueva);
}

function listarSolicitudes(req, res) {
  res.json(solicitudes);
}

function listarSolicitudesSSR(req, res) {
  res.render("solicitudes", { solicitudes });
}

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  listarSolicitudesSSR
};
