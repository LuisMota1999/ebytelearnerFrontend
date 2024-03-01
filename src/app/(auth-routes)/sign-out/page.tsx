"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import {FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLinkedin, FaLock, FaUser} from 'react-icons/fa'
import { MdError } from "react-icons/md";
export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const handleInputFocus = () => {
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    try {
        const res = await fetch(process.env.API_NEXT_URL+"/Auth/Register", {
          method: "POST",
          body: JSON.stringify(""),
          headers: { "Accept": "*/*", "Content-Type": "application/json" },
        });

        if (res.ok) {
          return redirect("/sign-in");
        }
        
      } catch (error) {
        console.error("Error during fetch:", error);
        
      }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:h-full lg:h-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-auto max-w-4xl mb-4 sm:mb-0">
        {/* Hello Friend section */}
        <div className="w-full lg:w-2/5 bg-[#00A76F] text-white rounded-t-2xl lg:rounded-tr-none lg:rounded-bl-2xl py-36 px-12 order-2 lg:order-1">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-6 text-xs sm:text-base">
            Fill up personal information and start journey learning byte per
            byte with us.
          </p>
          <a
            href="sign-up"
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
          >
            Sign Up
          </a>
        </div>
        {/* Sign in section */}
        <div className="w-full lg:w-3/5 p-5 order-1 lg:order-2">
          <div className="text-left font-bold">
            <span className="text-[#00A76F]">ebyte</span> Learner
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-[#00A76F] mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-10 border-[#00A76F] inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              <a
                href="#"
                className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
              >
                <FaFacebook className="text-sm"></FaFacebook>
              </a>
              <a
                href="#"
                className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
              >
                <FaLinkedin className="text-sm"></FaLinkedin>
              </a>
              <a
                href="#"
                className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
              >
                 <FaGoogle className="text-sm"></FaGoogle>
              </a>
            </div>
            <p className="text-gray-500 my-3">or use your email account</p>
            <form
              className="flex flex-col items-center "
              onSubmit={handleSubmit}
            >
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaUser className="text-gray-400 mr-2"></FaUser>
                <input
                  className="bg-gray-100 outline-none text-sm flex-1"
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaLock className="text-gray-400 mr-2"></FaLock>
                <input
                  className="bg-gray-100 outline-none text-sm flex-1"
                  type={showPassword? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleInputFocus}
                  ></input>
                <span
                  onClick={togglePasswordVisibility}
                  className="icon-password"
                >
                  {showPassword ? <FaEye color="text-gray-800"/>: <FaEyeSlash color="text-gray-800"/>  }
                </span>
              </div>
              {error && <div className="bg-white w-64 p-2 flex items-center mb-3 flex-row"><p className="text-red-500 text-xs text-left flex flex-row"><MdError/> &nbsp;{ error}</p></div>}
              <div className="flex w-64 mb-5 justify-between">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    name="remember"
                    className="mr-1"
                  ></input>
                  Remember me
                </label>
                <a href="/forgot-password" className="text-xs underline hover:text-gray-500">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="border-2 border-[#00A76F] rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
