const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const { readUsers, writeUsers } = require('../utils/fileStorage');
const axios = require('axios');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido");
}

async function registerUser(email, password) {
    const users = readUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        throw new Error('El usario ya existe.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeUsers(users);
    return { id: newUser.id, email: newUser.email };
}

async function loginUser(email, password) {
    const users = readUsers();
    const user = users.find(user => user.email === email);
    if (!user) {
        throw new Error('Credenciales inválidas');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return { token, user: { id: user.id, email: user.email } };
}

function logoutUser() {
    // Ya que estamos usando JWTs, el logout se maneja en el cliente eliminando el token.
    return true;
}

function getUserById(id) {
    const users = readUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return { id: user.id, email: user.email, createdAt: user.createdAt };
}

// Autentitación con GitHub

/*Intercambiar el código por un token de acceso
@param {string} code
@returns {string} accessToken
*/
async function getGitHubAccessToken(code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("GitHub Client ID o Client Secret no están definidos");
    }

    const params = new URLSearchParams()
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);

    const response = await axios.post('https://github.com/login/oauth/access_token', params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (response.data.error) {
        throw new Error(`Error al obtener el token de acceso: ${response.data.error_description}`);
    }

    return response.data.access_token;
}

/* Obtener información del usuario de GitHub
@param {string} accessToken
@returns {object} datos del usuario
*/
async function getGitHubUser(accessToken) {
    const response = await axios.get('https://api.github.com/user', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return response.data;
}


/* Login o registro con GitHub
@param {string} code
@returns {object} { token, user }
*/
async function loginOrRegisterWithGitHub(code) {
    const accessToken = await getGitHubAccessToken(code);
    const gitHubUser = await getGitHubUser(accessToken);
    const email = gitHubUser.email || `${gitHubUser.login}@github.com`;

    const users = readUsers();
    let user = users.find(user => user.email === email);
    if (!user) {
        user = {
            id: uuidv4(),
            email,
            password: null,
            createdAt: new Date().toISOString(),
            githubId: gitHubUser.id
        };
        users.push(user);
        writeUsers(users);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return { token, user: { id: user.id, email: user.email } };
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserById,
    loginOrRegisterWithGitHub
};