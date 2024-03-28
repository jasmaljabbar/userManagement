import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { logout } from "../../ReduxStore/ReduxStore";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.user.username;
  });
  const [isSuper, setisSuper] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const refresh_tokens = localStorage.getItem("refresh_token");
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const isSuperFromStorage = localStorage.getItem("is_super") === "true";
      setisSuper(isSuperFromStorage);
      console.log("is super =", isSuperFromStorage); 
      console.log("yellow its here");
    }
  }, []);

  const logoutHandle = () => {
    (async () => {
      try {
       
        const requestData = {
          refresh_token: refresh_tokens, 
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/api/logout",
          requestData,
          config
        );

       
        if (response.status === 205) {
         
          axios.defaults.headers.common["Authorization"] = null;
          window.location.href = "/login";
          dispatch(logout());
          alert("Logout successful");
        } else {
          
          console.log("Logout failed");
        }
      } catch (error) {
        
        console.error("Logout error:", error);
      }
    })();
  };
  return (
    <div className="container mx-auto bg-gray-500 flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link
        to="/"
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        {/* Content for your link */}Home
      </Link>
      <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      {!isAuth && (
        <Link className="mr-5" to="/register">
          Sign up
        </Link>)}
        {isSuper && (
          <Link className="mr-5" to="/admin">
            Admin
          </Link>
        )}
        {isAuth && (
          <Link className="mr-5" to="/profile">
            Profile
          </Link>
        )}
      </div>
      <h5
        onClick={() => console.log(username)}
        className="inline-flex items-center border-0 py-1 px-3 mt-4 md:mt-0"
      >
        hello {username}{" "}
      </h5>
      <button
        onClick={logoutHandle}
        className="inline-flex items-center rounded  bg-red-400 border-0 py-1 px-3 mt-4 md:mt-0"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
