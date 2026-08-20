import { useState } from "react";
import Navbar from "../../../components/home/navbar";
import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";
import { useNavigate } from "react-router-dom";

interface CompanyInfo {
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: string;
  companyType: string;
  numberOfEmployees: string;
  website: string;
  logo: string;
  description: string;
}
const CompanyInformation = () => {
     const navigate=useNavigate()
  const [formData, setFormData] = useState<CompanyInfo>({

 
    companyName: "",
    registrationNumber: "",
    companyEmail: "",
    phone: "",
    yearEstablished: "",
    companyType: "",
    numberOfEmployees: "",
    website: "",
    logo: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
 navigate("/register/company-register/location");
    console.log("Company Information:", formData);

    // Next page navigation will be added later
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <Navbar showRegister={false} />

      {/* Registration Content */}
<div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">
        {/* Sidebar */}
        <RegistrationAuthSidebar currentStep={2} />

      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Company Information
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Enter your basic company information
          </p>
        </div>

 

        {/* <div className="mb-8 flex items-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              1
            </div>

            <span className="ml-2 text-sm font-medium">
              Company Information
            </span>
          </div>

          <div className="mx-4 h-px flex-1 bg-gray-300" />

          <div className="flex items-center text-gray-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-sm">
              2
            </div>

            <span className="ml-2 text-sm">
              Location
            </span>
          </div>

          <div className="mx-4 h-px flex-1 bg-gray-300" />

          <div className="flex items-center text-gray-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-sm">
              3
            </div>

            <span className="ml-2 text-sm">
              Documents
            </span>
          </div>
        </div> */}

        {/* Form */}

        <form onSubmit={handleNext} className="space-y-6">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Company Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Registration Number */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Company Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Email
              </label>

              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="company@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Year Established */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Year Established
              </label>

              <input
                type="number"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleChange}
                placeholder="2020"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Company Type */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Type
              </label>

              <select
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="">
                  Select company type
                </option>

                <option value="PRIVATE_LIMITED">
                  Private Limited
                </option>

                <option value="PUBLIC_LIMITED">
                  Public Limited
                </option>

                <option value="LLP">
                  LLP
                </option>

                <option value="PARTNERSHIP">
                  Partnership
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>

            {/* Employees */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Number of Employees
              </label>

              <select
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="">
                  Select employee range
                </option>

                <option value="1-50">
                  1-50
                </option>

                <option value="51-200">
                  51-200
                </option>

                <option value="201-500">
                  201-500
                </option>

                <option value="500+">
                  500+
                </option>
              </select>
            </div>

            {/* Website */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Logo */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Logo URL
            </label>

            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter a short description about your company"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Next */}

          <div className="flex justify-end border-t pt-6">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-7 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>

        </form>
        
      </div>
    </div>
    </div>
  );
};

export default CompanyInformation;