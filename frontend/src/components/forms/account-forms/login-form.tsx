import { useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";
import validateEmail from "./validation/email-validation";
import { validatePassword } from "./validation/password-validation";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormBase onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            validateEmail(e.target.value, setEmailErrors, setEmail);
          }}
          placeholder="Enter your email"
          errors={emailErrors}
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            validatePassword(e.target.value, setPasswordErrors, setPassword);
          }}
          placeholder="Enter your password"
          errors={passwordErrors}
        />
        <Button type="submit">Login</Button>
      </FormBase>
    </div>
  );
};

export default LogInForm;