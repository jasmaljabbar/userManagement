import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../items/Spinner/Spinner";


const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [password, setPassword] = useState("");


  useEffect(() => {
    // Check if an access token exists in localStorage
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      // If an access token exists, redirect the user to the home page
      history("/");
    }
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("email" + email, "password" + password);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: email,
        password: password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("is_super", response.data.admin);
      
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      history("/");

      // You can handle the response data here, such as storing tokens.
    } catch (error) {
      setLoading(false);
      errorToast();
    }
  };
  const errorToast = () => toast.error("Password or Username invalid!!");
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
    {loading && <Spinner />}
    <div className="md:w-1/3 max-w-sm">
    <div>
  <img
    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
    alt="Login form illustration"
  />
</div>
    </div>
    <div className="md:w-1/3 max-w-sm border border-gray-300 rounded p-8">
      <form onSubmit={handleSubmit}>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Login
          </p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <div className="mt-4 flex justify-between font-semibold text-sm"></div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-red-600 hover:underline hover:underline-offset-4"
          href="#"
        >
          Register
        </Link>
      </div>
    </div>
    <Toaster />
  </section>
  
  );
};

export default Login;
