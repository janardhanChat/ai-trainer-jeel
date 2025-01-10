"use client";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import LoginImageTextSection from "@/components/sections/LoginImageTextSection";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

    if (!data.firstName) {
      errors.firstName = "First name is required.";
    }

    if (!data.lastName) {
      errors.lastName = "Last name is required.";
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "https://api.ai-trainer.rejoicehub.com/api/v1/auth/signup",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.success) {
          toast.success("Sign up successful! Please login.");
          router.push("/");
        } else {
          toast.error(
            response.data.message || "Sign up failed. Please try again."
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Sign up failed. Please try again."
        );
        console.error("Error signing up:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-0 items-center h-screen">
      <div className="h-screen">
        <LoginImageTextSection />
      </div>
      <div className="max-w-[501px] mx-auto">
        <h1 className="text-[32px] text-black font-bold leading-[40px] mb-[14px]">
          Create your account <span className="gradient-text">AI Trainer</span>{" "}
          ✨
        </h1>
        <p className="text-xl text-black opacity-[0.6] font-medium mb-10">
          Enter your details to create your account.
        </p>
        <div className="space-y-6" autoComplete="off">
          <div>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleOnChange}
              error={formErrors.firstName}
              autoComplete="new-first-name"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleOnChange}
              error={formErrors.lastName}
              autoComplete="new-last-name"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              error={formErrors.email}
              autoComplete="new-email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              error={formErrors.password}
              autoComplete="new-password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <Button
            className="w-full"
            text={isSubmitting ? "Creating Account..." : "Sign Up"}
            disabled={isSubmitting}
            handleClick={handleSubmit}
          />
        </div>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
