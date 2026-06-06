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
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-white text-decoration-none"
        >
          MyShop
        </Link>

        <div className="flex items-center gap-3">

          {userInfo ? (
            <>
              <span class="bold  ">
                Welcome {userInfo.name}
              </span>

               <Link
                to="/products"
                
              >
                Products
              </Link>



              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>

             


            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-black px-4 py-2 rounded text-decoration-none"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded text-decoration-none"
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