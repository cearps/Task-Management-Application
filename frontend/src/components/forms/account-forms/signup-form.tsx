import { useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";
import UserAPI from "../../../api/userAPI";
import { NewUserData } from "../../../utilities/types";
import { useNavigate } from "react-router-dom";
import validateUsername from "./validation/username-validation";
import validateEmail from "./validation/email-validation";
import validatePassword from "./validation/password-validation";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [usernameErrors, setUsernameErrors] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] =
    useState("");
  const allErrors = [
    usernameErrors,
    emailErrors,
    passwordErrors,
    passwordConfirmationErrors,
  ];
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
          onChange={(e) => {
            validateUsername(e.target.value, setUsernameErrors, setUsername);
          }}
          placeholder="Enter your username"
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            validateEmail(e.target.value, setEmailErrors, setEmail);
          }}
          placeholder="Enter your email"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            validatePassword(e.target.value, setPasswordErrors, setPassword);
          }}
          placeholder="Enter your password"
        />
        <Field
          label="Password Confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => {
            validatePassword(
              e.target.value,
              setPasswordConfirmationErrors,
              setPasswordConfirmation
            );
          }}
          placeholder="Confirm your password"
        />
        <Button type="submit">Sign Up</Button>
      </FormBase>
    </div>
  );
};

export default SignUpForm;
