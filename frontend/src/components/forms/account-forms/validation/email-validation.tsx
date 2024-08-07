export default function validateEmail(
  email: string,
  setEmailErrors: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
): void {
  const errors: Array<string> = [];
  if (!email) {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email is invalid");
  }
  setEmailErrors(errors.join(", "));
  setEmail(email);
}
