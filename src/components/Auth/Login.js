import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import AuthContext from "../../store/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = () => {
    const email = getValues("email");
    const password = getValues("password");

    axios
      .post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
          authCtx.login(
            null,
            expirationTime,
            res.data.active,
            res.data.username
          );
          return navigate("/");
        }
        if (res.data.code === "validationerror") {
          const error = res.data.msg;
          if (error.param === "email") {
            if (error.msg === "required") {
              setError("email", {
                type: "required",
              });
            }
            if (error.msg === "pattern") {
              setError("email", {
                type: "pattern",
              });
            }
          } else if (error.param === "password") {
            if (error.msg === "required") {
              setError("password", {
                type: "required",
              });
            }
            if (error.msg === "pattern") {
              setError("password", {
                type: "pattern",
              });
            }
          }
        } else if (res.data.code === "invdata") {
          setError("email", {
            type: "invdata",
          });
          setError("password", {
            type: "invdata",
          });
        } else if (res.data.code === "usernotfound") {
          setError("email", {
            type: "usernotfound",
          });
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email?.type === "required" && <p>Email is required.</p>}
        {errors.email?.type === "pattern" && <p>Invalid email.</p>}
        {errors.email?.type === "usernotfound" && <p>Email doesn't exist.</p>}
        {errors.email?.type === "invdata" && <p>Invalid email or password.</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.password?.type === "required" && <p>Password is required.</p>}
        {errors.password?.type === "pattern" && (
          <p>
            Password must have a minimum of eight characters, at least one
            uppercase letter, one lowercase letter, one number and one special
            character.
          </p>
        )}
        {errors.password?.type === "invdata" && (
          <p>Invalid email or password.</p>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Login;
