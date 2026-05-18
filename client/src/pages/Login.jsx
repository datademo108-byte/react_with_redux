import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setUser } from "../features/auth/authSlice";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      dispatch(setUser(data.user));

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data.user)
      );

      navigate("/");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card p-4">

            <h2 className="mb-4">
              Login
            </h2>

            <form onSubmit={submitHandler}>

              <input
                type="email"
                placeholder="Enter Email"
                className="form-control mb-3"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Enter Password"
                className="form-control mb-3"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="btn btn-success w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;