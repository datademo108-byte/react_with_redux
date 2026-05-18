import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

function Navbar() {

  const dispatch = useDispatch();

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  const logoutHandler = () => {

    dispatch(logout());

    localStorage.removeItem("userInfo");
  };

  return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container">

        <Link className="navbar-brand" to="/">
          MyShop
        </Link>

        <div>

          {userInfo ? (

            <>
              <span className="text-white me-3">
                Welcome {userInfo.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link
                className="btn btn-light me-2"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-warning"
                to="/register"
              >
                Register
              </Link>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;