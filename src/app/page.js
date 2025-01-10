"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import SignInwithGoogle from "@/components/widgets/SignInwithGoogle";
import LoginImageTextSection from "@/components/sections/LoginImageTextSection";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/api/api/constantsKey";
import axios from "axios";
import { setCookie } from "@/hooks/useCookie";
import { useConversation } from "@/contexts/ConversationContext";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {getUserInfoFromCookiee} = useConversation();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (data) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format.";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const login = async () => {
        try {
          setIsSubmitting(true);
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: formData.email,
            password: formData.password,
          });
          return response;
        } catch (error) {
          console.error("Error logging in:", error);
          return error;
        }
      };

      login()
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data)
          if (data?.data?.success) {
            let userToken = data?.data?.payload?.tokens;
            setCookie("userToken", userToken);
            setCookie("userInformation", JSON.stringify(data?.data?.payload?.user));
            localStorage.setItem("userInformation", JSON.stringify(data?.data?.payload?.user));
            getUserInfoFromCookiee();
            toast.success("Login successful!");
            setIsSubmitting(false);
            router.push("/select-ai-trainer");
          } else {
            setIsSubmitting(false);
            toast.error(data?.data?.message || "Login failed. Please try again.");
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          toast.error(error.message || "Login failed. Please try again.");
          console.error("Error logging in:", error);
        });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-0 items-center h-screen">
        <div className="h-screen">
          <LoginImageTextSection />
        </div>
        <div className="max-w-[501px] mx-auto">
          <h1 className="text-[32px] text-black font-bold leading-[40px] mb-[14px]">
            Welcome to <span className="gradient-text">AI Trainer</span> ✋
          </h1>
          <p className="text-xl text-black opacity-[0.6] font-medium mb-10">
            Enter the information you entered while registering.
          </p>
          {/* <form onSubmit={handleSubmit}
           onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent Enter key from submitting the form
            }
          }}
          > */}
            <div className="pb-6">
              <Input
                label="Email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                error={formErrors.email}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div className="pb-[18px]">
              <Input
                label="Password"
                placeholder="Enter your password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleOnChange}
                error={formErrors.password}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>
            <a className="block text-blue pb-10 text-right text-lg font-semibold cursor-pointer">
              Forgot password?
            </a>
            <div className="pb-10">
              <Button
                className="w-full"
                text={isSubmitting ? "Logging in..." : "Login"}
                disabled={isSubmitting}
                type="submit"
                handleClick={handleSubmit}
              />
              <p className="text-center mt-6 text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                  Sign Up
                </Link>
              </p>
            </div>
            {/* <div className="grid grid-cols-[1fr_30px_1fr] gap-5 items-center pb-10">
              <div className="border-t border-solid border-borderColor"></div>
              <span className="text-lg text-gray900 font-semibold block">
                OR
              </span>
              <div className="border-t border-solid border-borderColor"></div>
            </div>
            <SignInwithGoogle /> */}
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
