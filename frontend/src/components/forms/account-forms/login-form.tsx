import { useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement login logic
    // onLogin({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormBase onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Button type="submit">Login</Button>
      </FormBase>
    </div>
  );
};

export default LogInForm;
