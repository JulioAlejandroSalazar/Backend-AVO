function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateSolicitudBody(body) {
  const errors = [];

  const requiredFields = [
    "dni",
    "nombreCliente",
    "email",
    "origen",
    "destino",
    "tipoViaje",
    "fechaSalida",
    "fechaRegreso",
    "estado"
  ];

  requiredFields.forEach(field => {
    if (!body[field] || body[field].toString().trim() === "") {
      errors.push(`El campo ${field} es obligatorio.`);
    }
  });

  if (body.email && !isValidEmail(body.email)) {
    errors.push("Formato de email inválido.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateSolicitudBody
};
