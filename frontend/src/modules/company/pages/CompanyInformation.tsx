import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../auth/context/AuthContext";


import { companyRegistrationSchema } from "../schema/companyRegistrationSchema";
import {
  createCompanyRequest,
  getCompanyTypes,
  getEmployRange,
  getMyCompanyRequestForEdit,
  updateCompanyRequest,
  uploadCompanyLogo,
} from "../Services/CompanyRequestService";

import type { CompanyInfo } from "../types/companyTypes";
import RegistrationLayout from "../../auth/components/RegistrationLayout";

const CompanyInformation = () => {
  // const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { companyRequestId } = useParams();

  console.log("Company Request ID:", companyRequestId);

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

  const [companyTypes, setCompanyTypes] = useState<string[]>([]);
  const [employeeRange, setEmployeeRange] = useState<string[]>([]);
const [logoFile, setLogoFile] = useState<File | null>(null);
  

/*
   * Fetch existing Company Request
   *
   * Used when editing/resubmitting an existing request.
   */
  useEffect(() => {
    if (!companyRequestId) {
      return;
    }

    const fetchCompanyRequest = async () => {
      try {
        const response =
          await getMyCompanyRequestForEdit(companyRequestId);

        const company = response.data.company;

        setFormData({
          companyName: company.companyName || "",
          registrationNumber: company.registrationNumber || "",
          companyEmail: company.companyEmail || "",
          phone: company.phone || "",
          yearEstablished: company.yearEstablished
            ? String(company.yearEstablished)
            : "",
          companyType: company.companyType || "",
          numberOfEmployees: company.numberOfEmployees || "",
          website: company.website || "",
          logo: company.logo || "",
          description: company.description || "",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchCompanyRequest();
  }, [companyRequestId]);

 
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const result = await getCompanyTypes();

        console.log("Result=:", result);

        setCompanyTypes(result.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    const fetchEmployeRange = async () => {
      try {
        const res = await getEmployRange();

        console.log("result", res);

        setEmployeeRange(res.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchEmployeRange();
    fetchCompanyTypes();
  }, []);

  
const handleLogoChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];
console.log("image logochange:",);
  if (!file) {
    return;
  }

  try {
    setLogoFile(file);

    const result = await uploadCompanyLogo(file);

    console.log("Logo uploaded:", result.data.logo);

    setFormData((prev) => ({
      ...prev,
      logo: result.data.logo,
    }));

    toast.success("Logo uploaded successfully");
  } catch (error) {
    setLogoFile(null);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to upload logo"
    );
  }
};
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("change")

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = companyRegistrationSchema.safeParse(formData);
console.log(result)
    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof CompanyInfo, string>
      > = {};

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

    setErrors({});

    try {
      const payload = {
        ...formData,

        yearEstablished: formData.yearEstablished
          ? Number(formData.yearEstablished)
          : null,

        website: formData.website || null,
        logo: formData.logo || null,
        description: formData.description || null,
      };

      /*
       * RESUBMIT / UPDATE
       */
      if (companyRequestId) {
        const response = await updateCompanyRequest(
          companyRequestId,
          payload
        );

        console.log("Company request updated:", response);

        toast.success("Company Info Updated");

        navigate(
          `/register/company-register/${companyRequestId}/location`
        );

        return;
      }

      /*
       * NEW REGISTRATION / CREATE
       */
      const accountId = localStorage.getItem("accountId");

      if (!accountId) {
        toast.error("Account ID not found");
        return;
      }

      const createPayload = {
        accountId,
        ...payload,
      };
console.log("🔥 HANDLE NEXT CALLED");

console.log("Company Request ID:", companyRequestId);

console.log("🔥 ABOUT TO CREATE COMPANY REQUEST");

const response = await createCompanyRequest(createPayload);

console.log("🔥 CREATE COMPANY REQUEST SUCCESS");
console.log("CREATE RESPONSE:", response);
      // const response = await createCompanyRequest(createPayload);

    
console.log("CREATE RESPONSE:", response);
console.log("NEW COMPANY REQUEST ID:", response.data.id);


      const createCompanyRequestId=response.data.id
      // localStorage.setItem(
      //   "companyRequestId",
      //   response.data.id
      // );

      toast.success("Company Info Saved");

     navigate(
  `/register/company-register/${createCompanyRequestId}/location`
);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <RegistrationLayout currentStep={5}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Company Information
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your basic company information.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleNext} className="space-y-6">

          {/* Company Name + Registration Number */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>

              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />

              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Registration Number */}
            <div>
              <label
                htmlFor="registrationNumber"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Registration Number
              </label>

              <input
                id="registrationNumber"
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />

              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            {/* Company Email */}
            <div>
              <label
                htmlFor="companyEmail"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company Email
              </label>

              <input
                id="companyEmail"
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="company@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />

              {errors.companyEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyEmail}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Year Established */}
            <div>
              <label
                htmlFor="yearEstablished"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Year Established
              </label>

              <input
                id="yearEstablished"
                type="number"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleChange}
                placeholder="2020"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />

              {errors.yearEstablished && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.yearEstablished}
                </p>
              )}
            </div>

            {/* Company Type */}
            <div>
              <label
                htmlFor="companyType"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company Type
              </label>

              <select
                id="companyType"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              >
                <option value="">
                  Select company type
                </option>

                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {errors.companyType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyType}
                </p>
              )}
            </div>

            {/* Employees */}
            <div>
              <label
                htmlFor="numberOfEmployees"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Number of Employees
              </label>

              <select
                id="numberOfEmployees"
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              >
                <option value="">
                  Select employee range
                </option>

                {employeeRange.map((range) => (
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
              <label
                htmlFor="website"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Website
              </label>

              <input
                id="website"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
              />
            </div>
          </div>

          {/* Logo */}
        {/* Logo */}
<div>
  <label
    htmlFor="logo"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Company Logo
  </label>

  <input
  id="logo"
  type="file"
  name="logo"
  accept="image/png,image/jpeg,image/jpg,image/webp"
  onChange={(event) => {
    console.log("🔥 LOGO INPUT CHANGED");
    console.log("📁 Selected file:", event.target.files?.[0]);

    handleLogoChange(event);
  }}
  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
/>

  <p className="mt-1 text-xs text-gray-500">
    Optional. PNG, JPG, JPEG or WEBP.
  </p>
</div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Company Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter a short description about your company"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />
          </div>

          {/* Next */}
          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="rounded-lg bg-[#24113F] px-7 py-2.5 font-medium text-white transition hover:bg-[#321957]"
            >
              Next →
            </button>
          </div>

        </form>
      </div>
    </RegistrationLayout>
  );
};

export default CompanyInformation;