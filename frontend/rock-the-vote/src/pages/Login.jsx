import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/images/RTVlogo.jpg";
import axiosInstance from "../axiosInstance";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const initInputs = { email: "", password: "" };
  const [inputs, setInputs] = useState(initInputs);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/login", inputs, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  const { email, password } = inputs;

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">
            <img src={logo} className="flex-none w-[100px] " />
          </Link>
        </h1>
        <h3>
          <Link to="/signup">Sign Up</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Log in
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
