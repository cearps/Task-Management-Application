function validatePassword(
  password: string,
  setPasswordErrors: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>
): void {
  const errors: Array<string> = [];
  if (!password) {
    errors.push("Password is required");
  } else {
    if (!password.match(/^(?=.*[a-z])/)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!password.match(/^(?=.*[A-Z])/)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!password.match(/^(?=.*\d)/)) {
      errors.push("Password must contain at least one number");
    }
    if (!password.match(/^(?=.*[!@#$%^&*])/)) {
      errors.push("Password must contain at least one special character");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
  }
  setPasswordErrors(errors.join(", "));
  setPassword(password);
}

function validatePasswordConfirmation(
  password: string,
  passwordConfirmation: string,
  setPasswordConfirmationErrors: React.Dispatch<React.SetStateAction<string>>,
  setPasswordConfirmation: React.Dispatch<React.SetStateAction<string>>
): void {
  const errors: Array<string> = [];
  if (!passwordConfirmation) {
    errors.push("Password Confirmation is required");
  } else if (password !== passwordConfirmation) {
    errors.push("Passwords do not match");
  }
  setPasswordConfirmationErrors(errors.join(", "));
  setPasswordConfirmation(passwordConfirmation);
}

export { validatePassword, validatePasswordConfirmation };
