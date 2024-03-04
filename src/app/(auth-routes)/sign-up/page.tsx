"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaLinkedin,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BiSolidLockOpen } from "react-icons/bi";

const formSchema = z
  .object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    email: z.string().email({
      message: "Email is not valid.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });
  const { isSubmitting } = form.formState;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("http://localhost:5033/Auth/Register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { Accept: "*/*", "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:h-full lg:h-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-auto max-w-4xl mb-4 sm:mb-0 h-[80%] 2xl:h-auto">
        {/* Hello Friend section */}
        <div className="w-full lg:w-2/5 bg-[#00A76F] text-white rounded-b-2xl lg:rounded-tr-none lg:rounded-bl-2xl lg:rounded-br-none lg:rounded-tl-2xl py-24 2xl:pt-28   px-12 order-2 lg:order-1">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-6 text-xs sm:text-base">
            Fill up personal information and start your journey learning byte
            per byte with us.
          </p>
          <div className="flex justify-center my-2">
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1 bg-white hover:bg-gray-200"
            >
              <FaFacebook className="text-sm text-blue-500 "></FaFacebook>
            </a>
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1 bg-white hover:bg-gray-200"
            >
              <FaLinkedin className="text-sm text-blue-400"></FaLinkedin>
            </a>
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1 bg-white hover:bg-gray-200"
            >
              <FcGoogle className="text-sm"></FcGoogle>
            </a>
          </div>

          <a
            href="sign-in"
            className="mt-8 border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
          >
            Sign in
          </a>
        </div>
        {/* Sign up section */}
        <div className="w-full lg:w-3/5 p-5 order-1 lg:order-2">
          <div className="text-left font-bold">
            <span className="text-[#00A76F]">ebyte</span> Learner
          </div>
          <div className="py-10 sm:py-6">
            <h2 className="text-3xl font-bold text-[#00A76F] mb-2">
              Create New Account
            </h2>
            <div className="border-2 w-10 border-[#00A76F] inline-block mb-2"></div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-xs  items-left text-left" />
                      <FormControl>
                        <div className="bg-gray-100 w-64 px-2 flex items-center my-2">
                          <FaUser className="text-gray-400 mr-2"></FaUser>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Username"
                            className="bg-gray-100 outline-none text-sm flex-1 border-none"
                            type="text"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-xs items-left text-left" />
                      <FormControl>
                        <div className="bg-gray-100 w-64 px-2 flex items-center my-2">
                          <MdEmail className="text-gray-400 mr-2"></MdEmail>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Email"
                            className="bg-gray-100 outline-none text-sm flex-1 border-none"
                            type="text"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-xs items-left text-left" />
                      <FormControl>
                        <div className="bg-gray-100 w-64 px-2 flex items-center my-2">
                          <FaLock className="text-gray-400 mr-2"></FaLock>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            disabled={isSubmitting}
                            className="bg-gray-100 outline-none text-sm flex-1 border-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-xs items-left text-left" />
                      <FormControl>
                        <div className="bg-gray-100 w-64 px-2 flex items-center my-2">
                          <BiSolidLockOpen
                            size={20}
                            className="text-gray-400 mr-2"
                          ></BiSolidLockOpen>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            disabled={isSubmitting}
                            className="bg-gray-100 outline-none text-sm flex-1 border-none"
                            {...field}
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className="icon-password"
                          >
                            {showPassword ? (
                              <FaEye className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                            ) : (
                              <FaEyeSlash className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  className="border-2 border-[#00A76F] rounded-full px-12 py-2 mt-4 2xl:mt-4 inline-block font-bold hover:bg-white hover:text-[#00A76F] hover:border-gray-400 cursor-pointer "
                  disabled={isSubmitting ? true : false}
                >
                  Sign Up
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
