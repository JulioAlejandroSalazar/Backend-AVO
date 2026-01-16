const e = require("express");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    if(typeof password !== 'string' || password.length < 6) {
        return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
}
    

function validateRegisterBody(body) {
    const errors = [];
    if(!body.email || typeof body.email !== 'string') {
        errors.push('Email invalido.');
    } else if (!isValidEmail(body.email)) {
        errors.push('Formato de email incorrecto.');
    }

    if(!body.password || typeof body.password !== 'string') {
        errors.push('Contraseña invalida.');
    } else if (!isValidPassword(body.password)) {
        errors.push('Contraseña debe tener al menos 6 caracteres y contener letras mayusculas, minusculas y un numero.');
    }

    return{
        isValid: errors.length === 0,
        errors
    };
}

function validateLoginBody(body) {
    const errors = [];
    if(!body.email || typeof body.email !== 'string') {
        errors.push('Email invalido.');
    } else if (!isValidEmail(body.email)) {
        errors.push('Formato de email incorrecto.');
    }

    if(!body.password || typeof body.password !== 'string') {
        errors.push('Contraseña invalida.');
    } else if (!isValidPassword(body.password)) {
        errors.push('Contraseña debe tener al menos 6 caracteres y contener letras mayusculas, minusculas y un numero.');
    }

    return{
        isValid: errors.length === 0,
        errors,
    };
}

module.exports = {
    validateRegisterBody,
    validateLoginBody
};