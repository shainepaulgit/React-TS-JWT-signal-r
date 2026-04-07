import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../providers/authentication/auth-context";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import type { LoginFormInputs } from "./loginFormInputs";
import type { LoginResponse } from "./loginResponse";
const LoginPage = ()  => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setServerError("");

    try {
      const { data: res } = await axios.post<LoginResponse>("/api/authentication/login", data);
      const { token, requires2FA, errorMessage } = res;

      if (requires2FA) {
        navigate(`/two-factor?username=${encodeURIComponent(data.username)}&rememberMe=${data.rememberMe}`);
        return;
      }

      if (token) {
        login(token, data.rememberMe);
      } else if (errorMessage) {
        setServerError(errorMessage);
      }
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.errorMessage
          ? err.response.data.errorMessage
          : err instanceof Error
          ? err.message
          : "Login failed. Please try again.";
      setServerError(message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Login</h2>
      {serverError && <p className="text-danger">{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="form-control mb-2"
        />
        {errors.username && <p className="text-danger">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="form-control mb-2"
        />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}

        <label className="mb-2">
          <input type="checkbox" {...register("rememberMe")} /> Remember Me
        </label>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;