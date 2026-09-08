import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";
import { companyRegistrationSchema } from "../schema/companyRegistrationSchema";
import { createCompanyRequest, getCompanyTypes, getEmployRange } from "../Services/CompanyRequestService";
import type { CompanyInfo } from "../types/companyTypes";
import Navbar from "../../../components/home/Navbar";



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
const [errors, setErrors] = useState<
  Partial<Record<keyof CompanyInfo, string>>
>({});
const [companyTypes, setCompanyTypes] =
  useState<string[]>([]);
  const [employeeRange, setEmployeeRange] =
  useState<string[]>([]);

useEffect(() => {
  const fetchCompanyTypes = async () => {
    try {
      const result = await getCompanyTypes();
console.log("Result=:",result)
      setCompanyTypes(result.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const fetchEmployeRange=async()=>{
    try {
      const res=await getEmployRange()
      console.log("result",res)
      setEmployeeRange(res.data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
fetchEmployeRange()
  fetchCompanyTypes();
}, []);
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

 const handleNext = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Frontend validation
  const result = companyRegistrationSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof CompanyInfo, string>> = {};

    const errors = result.error.flatten().fieldErrors;

    Object.keys(errors).forEach((key) => {
      const field = key as keyof CompanyInfo;

      if (errors[field]?.[0]) {
        fieldErrors[field] = errors[field][0];
      }
    });

    setErrors(fieldErrors);

    return;
  }

  // 2. Validation success ആയാൽ പഴയ errors clear ചെയ്യുക
  setErrors({});

  const accountId = localStorage.getItem("accountId");

  console.log("Id:", accountId);

  if (!accountId) {
    toast.error("Account ID not found");
    return;
  }

  try {
    const payload = {
      accountId,
      ...formData,

      yearEstablished: formData.yearEstablished
        ? Number(formData.yearEstablished)
        : null,

      website: formData.website || null,
      logo: formData.logo || null,
      description: formData.description || null,
    };

    const response = await createCompanyRequest(payload);

    console.log("Company request created:", response);

    localStorage.setItem(
      "companyRequestId",
      response.data.id
    );

    toast.success("Company Info Saved");

    navigate(
      "/register/company-register/location"
    );

  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
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
               {errors.companyName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyName}
                    </p>
                  )}
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

               {errors.registrationNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.registrationNumber}
                    </p>
                  )}
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
               {errors.companyEmail && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyEmail}
                    </p>
                  )}
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
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
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
               {errors.yearEstablished && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.yearEstablished}
                    </p>
                  )}
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
{
  companyTypes.map((type)=>(
    <option key={type} value={type}>
    {type}
    </option>
  )

  )
}
              </select>
              {errors.companyType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyType}
                    </p>
                  )}
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
{employeeRange.map((range)=>(
  <option key={range} value={range}>
    {range}
  </option>
))}
              </select>
                {errors.numberOfEmployees && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.numberOfEmployees}
                    </p>
                  )}
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