import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Navbar from "../../../components/home/navbar";
import RegistrationAuthSidebar from "../components/RegistrationAuthSidebar";
import { registerAdmin } from "../services/authService";
import {
    adminRegistrationSchema,
    type AdminRegistrationData,
} from "../validators/adminRegistrationSchema";

const AdminRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [errors, setErrors] = useState<
    Partial<Record<keyof AdminRegistrationData, string>>
  >({});

  const [formData, setFormData] = useState<AdminRegistrationData>({
    firstName: "",
    lastName: "",
    designation: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = adminRegistrationSchema.safeParse(formData);


    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AdminRegistrationData, string>> =
        {};

      const errors = result.error.flatten().fieldErrors;

      Object.keys(errors).forEach((key) => {
        const field = key as keyof AdminRegistrationData;

        if (errors[field]?.[0]) {
          fieldErrors[field] = errors[field][0];
        }
      });

      setErrors(fieldErrors);

      return;
    }
    console.log("Valid Admin Data:", result.data);

    setErrors({});
    if (!email) {
      console.error("Email is missing");
      return;
    }
    try {
      const res = await registerAdmin({ ...result.data, email });
      console.log("Admin registration response:", res);
      toast.success(res.message)
      localStorage.setItem( "accountId", res.data.accountId
);
      navigate("/register/company-register", {
        state: { email },
      });
    } catch (error) {

     if(error instanceof Error ){
toast.error(error.message)
     }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FC]">
      {/* Navbar */}
      <Navbar showRegister={false} />

      {/* Registration Content */}<div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">
        {/* Sidebar */}
        <RegistrationAuthSidebar currentStep={1} />

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl">
            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-[#6D3CC9]">
                STEP 01
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Admin Registration
              </h2>

              <p className="mt-2 text-gray-500">
                Enter your personal and professional information.
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit}>
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6D3CC9] focus:ring-2 focus:ring-[#6D3CC9]/10"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                  
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6D3CC9] focus:ring-2 focus:ring-[#6D3CC9]/10"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Designation */}
                <div className="mt-6">
                  <label
                    htmlFor="designation"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>

                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                  
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6D3CC9] focus:ring-2 focus:ring-[#6D3CC9]/10"
                  />
                  {errors.designation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.designation}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="mt-6">
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <div className="flex">
                    <div className="flex items-center rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-600">
                      +91
                    </div>

                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      maxLength={10}
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                     
                      className="w-full rounded-r-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6D3CC9] focus:ring-2 focus:ring-[#6D3CC9]/10"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    ← Back
                  </button>

                  {/* Continue */}
                  <button
                    type="submit"
                    className="rounded-lg bg-[#24113F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#321957]"
                  >
                    Continue →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRegister;
