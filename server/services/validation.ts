

function calculateAge(dateOfBirth : Date) {

  const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function validateUserInformation(name: string, email: string, dateOfBirth: Date, password: string) {

  const nameValid = name && name.includes(' ') && name.length >= 5;
  const emailValid = email && email.includes('@') && email.length >= 5;
  const dateOfBirthValid = dateOfBirth && calculateAge(dateOfBirth) >= 18;
  const passwordValid = password.length >= 8;

  return nameValid && emailValid && dateOfBirthValid && passwordValid;
}