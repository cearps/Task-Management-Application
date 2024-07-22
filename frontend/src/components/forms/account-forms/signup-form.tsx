import { useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";
import UserAPI from "../../../api/userAPI";
import { NewUserData } from "../../../utilities/types";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: NewUserData = {
      username,
      email,
      password,
    };

    UserAPI.createUser(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/boards");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormBase onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <Field
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
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
        <Field
          label="Password Confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm your password"
        />
        <Button type="submit">Sign Up</Button>
      </FormBase>
    </div>
  );
};

export default SignUpForm;
