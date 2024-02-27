"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import {FaFacebook, FaGoogle, FaLinkedin, FaLock, FaUser} from 'react-icons/fa'
export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return;
    }

    router.replace("/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:h-full lg:h-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-auto max-w-4xl mb-4 sm:mb-0">
        {/* Hello Friend section */}
        <div className="w-full lg:w-2/5 bg-green-500 text-white rounded-t-2xl lg:rounded-tr-none lg:rounded-bl-2xl py-36 px-12 order-2 lg:order-1">
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
            <span className="text-green-500">ebyte</span> Learner
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
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
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaLock className="text-gray-400 mr-2"></FaLock>
                <input
                  className="bg-gray-100 outline-none text-sm flex-1"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
                className="border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
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
