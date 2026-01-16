const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const { readUsers, writeUsers } = require('../utils/fileStorage');

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

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserById
};