import { useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";
import UserAPI from "../../../api/userAPI";
import { NewUserData } from "../../../utilities/types";
import { useNavigate } from "react-router-dom";
import validateUsername from "./validation/username-validation";
import validateEmail from "./validation/email-validation";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "./validation/password-validation";
import { take } from "rxjs";

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

  const [signupErrors, setSignupErrors] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (allErrors.some((error) => error)) {
      return;
    }

    const data: NewUserData = {
      username,
      email,
      password,
    };

    return UserAPI.createUserObservable(data)
      .pipe(take(1))
      .subscribe(
        () => {
          navigate("/accounts/login");
        },
        (error) => {
          if (error.response.status) {
            setSignupErrors(error.response.data.description);
          } else {
            setSignupErrors("An error occurred. Please try again later.");
          }
        }
      );
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
        <Field
          label="Password Confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => {
            validatePasswordConfirmation(
              password,
              e.target.value,
              setPasswordConfirmationErrors,
              setPasswordConfirmation
            );
          }}
          placeholder="Confirm your password"
          errors={passwordConfirmationErrors}
        />
        <Button type="submit">Sign Up</Button>
        {signupErrors && (
          <p className="text-red-500 text-sm mt-2">{signupErrors}</p>
        )}
      </FormBase>
    </div>
  );
};

export default SignUpForm;
