import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = () => {
    console.log("Running submitHandler");
    const username = getValues("username");
    const email = getValues("email");
    const password = getValues("password");
    const confirmPassword = getValues("confirmPass");

    if (password !== confirmPassword) {
      return setError("confirmPass", {
        type: "nomatch",
      });
    }
    axios
      .post(
        "/auth/register",
        {
          username,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) return navigate("/");
        if (res.data.code === "validationerror") {
          const error = res.data.msg;
          if (error.param === "username") {
            if (error.msg === "required") {
              setError("username", {
                type: "required",
              });
            }
            if (error.msg === "minlength") {
              setError("username", {
                type: "minLength",
              });
            }
            if (error.msg === "maxlength") {
              setError("username", {
                type: "maxLength",
              });
            }
          } else if (error.param === "email") {
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
          } else if (error.param === "confirmPassword") {
            if (error.msg === "required") {
              setError("confirmPass", {
                type: "required",
              });
            }
            if (error.msg === "nomatch") {
              setError("confirmPass", {
                type: "nomatch",
              });
            }
          }
        } else if (res.data.code === "useralrexists") {
          setError("email", {
            type: "useralrexists",
          });
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
        {errors.username?.type === "required" && <p>Username is required.</p>}
        {errors.username?.type === "minLength" && (
          <p>Username must be atleast 3 characters long.</p>
        )}
        {errors.username?.type === "maxLength" && (
          <p>Username cannot be more than 20 character long.</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email?.type === "required" && <p>Email is required</p>}
        {errors.email?.type === "pattern" && <p>Invalid email</p>}
        {errors.email?.type === "useralrexists" && <p>Email already exists</p>}
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
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          {...register("confirmPass", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.confirmPass?.type === "required" && (
          <p>Please confirm your password.</p>
        )}
        {errors.confirmPass?.type === "nomatch" && <p>Passwords must match.</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
