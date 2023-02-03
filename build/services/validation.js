"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserInformation = void 0;
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function validateUserInformation(name, email, dateOfBirth, password) {
    const nameValid = name && name.includes(' ') && name.length >= 5;
    const emailValid = email && email.includes('@') && email.length >= 5;
    const dateOfBirthValid = dateOfBirth && calculateAge(dateOfBirth) >= 18;
    const passwordValid = password.length >= 8;
    return nameValid && emailValid && dateOfBirthValid && passwordValid;
}
exports.validateUserInformation = validateUserInformation;
