import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      alert("Register successfully! Now you can log in.");
      navigate("/login");
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
          <Link to="/login">Log In</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-md"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-md"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-md"
            placeholder="Password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-slate-800 rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">
              Something went wrong! Please try again.
            </h3>
          )}
          <div className="flex justify-center items-center space-x-2">
            <p>Already had an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login here!</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
