import { useEffect, useState } from "react";
import FormBase from "../form-base";
import Field from "../field";
import Button from "../../buttons/button";
import validateEmail from "./validation/email-validation";
import { validatePassword } from "./validation/password-validation";
import UserAPI from "../../../api/userAPI";
import { take } from "rxjs";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [loginErrors, setLoginErrors] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailErrors || passwordErrors) {
      return;
    }

    UserAPI.loginUserObservable({ email, password }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log("User logged in successfully");
          // set the token in local storage
          localStorage.setItem("token", response.data.token);
          // redirect to the boards page
          navigate("/boards");
        }
      },
      error: (error) => {
        if (error.response.status === 401) {
          setLoginErrors(error.response.data.description);
        } else {
          setLoginErrors("An error occurred. Please try again later.");
        }
      },
    });
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
        {loginErrors && <p className="text-red-500 mt-2">{loginErrors}</p>}
      </FormBase>
    </div>
  );
};

export default LogInForm;
