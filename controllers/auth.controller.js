const {v4: uuidv4} = require('uuid');
const authService = require('../services/auth.service');
const { validateRegisterBody, validateLoginBody } = require('../middleware/validation');
const { validateSolicitudBody } = require("../middleware/solicitudes.validation");


function sendSuccessResponse(res, data, message = {}) {
    res.json({
        status: "success",
        data,
        message,
        time: new Date().toISOString(),
        task_id: uuidv4()
    });
}

function sendErrorResponse(res, errorMessage, statusCode = 400) {
    res.status(statusCode).json({
        status: "error",
        message: errorMessage,
        time: new Date().toISOString(),
        task_id: uuidv4()
    });
}

async function register(req, res) {
    try {
        const {email, password} = req.body;
        const validation = validateRegisterBody(req.body);
        if (!validation.isValid) {
            return sendErrorResponse(res, validation.errors.join(' '), 400);
        }
        const user = await authService.registerUser(email, password);
        sendSuccessResponse(res, user, "Usuario registrado exitosamente.");
    } catch (error) {
        if (error.message === 'El usario ya existe.') {
            return sendErrorResponse(res, error.message, 409);
        } else {
            return sendErrorResponse(res, "Error al registrar el usuario.", 500);
        }
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const validation = validateLoginBody(req.body);
        if (!validation.isValid) {
            return sendErrorResponse(res, validation.errors.join(' '), 400);
        }
        const token = await authService.loginUser(email, password);
        sendSuccessResponse(res, {token}, "Usuario logueado exitosamente.");
    } catch (error) {
        sendErrorResponse(res, "Credenciales inválidas.", 401);
    }
}

async function getMe(req, res) {
    try {
        const user = authService.getUserById(req.user.id);
        sendSuccessResponse(res, user, "Información del usuario obtenida exitosamente.");
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            sendErrorResponse(res, error.message, 404);
        } else {
            sendErrorResponse(res, "Error al obtener la información del usuario.", 500);
        }
    }
}

async function crearSolicitud(req, res) {
  const validation = validateSolicitudBody(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      status: "error",
      message: validation.errors.join(" "),
      time: new Date().toISOString(),
      task_id: uuidv4()
    });
  }
}

/* controlador para callback de GitHub OAuth
@param {Object} req
@param {Object} res
*/
async function githubCallback(req, res) {
    try {
        const { code } = req.body;
        if (!code) {
            return sendErrorResponse(res, "Código de autorización no proporcionado.", 400);
        }

        const { token, user } = await authService.loginOrRegisterWithGitHub(code);
        sendSuccessResponse(res, { token, user }, "Usuario autenticado con GitHub exitosamente.");
    } catch (error) {
        sendErrorResponse(res, "Error durante la autenticación con GitHub.", 500);
    }
}

module.exports = {
    register,
    login,
    getMe,
    githubCallback
};