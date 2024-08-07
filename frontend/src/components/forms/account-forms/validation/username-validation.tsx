export default function validateUsername(
  username: string,
  setUsernameErrors: React.Dispatch<React.SetStateAction<string>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>
): void {
  const errors: Array<string> = [];
  if (!username) {
    errors.push("Username is required");
  } else if (!username || username.length < 3) {
    errors.push("Username must be at least 3 characters");
  }
  setUsernameErrors(errors.join(", "));
  setUsername(username);
}
