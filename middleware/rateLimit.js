const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "error",
    message: "Demasiados intentos de inicio de sesión. Intenta más tarde.",
  },
});

module.exports = {
  loginLimiter,
};
