import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { URL } from "../url.js";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(res.data);
      setUser(res.data);
      alert("Log in successfully!");
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">MyBlog</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-md"
            placeholder="Enter your email..."
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-md"
            placeholder="Enter your password..."
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-slate-800 rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Log In
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">
              Something went wrong! Please try again.
            </h3>
          )}
          <div className="flex justify-center items-center space-x-2">
            <p>Don't have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register here!</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
