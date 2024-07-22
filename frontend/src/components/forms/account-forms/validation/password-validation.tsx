export default function validatePassword(
  password: string,
  setPasswordErrors: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>
): void {
  const errors: Array<string> = [];
  if (!password) {
    errors.push("Password is required");
  } else if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  setPasswordErrors(errors.join(", "));
  setPassword(password);
}
