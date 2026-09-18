import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";



import {
  getMyCompanyRequestForEdit,
  updateCompanyLocation,
} from "../Services/CompanyRequestService";

import { companyLocationSchema } from "../schema/CompanyLocationSchema";

import type {
  CompanyLocationData,
  LocationData,
} from "../types/companyTypes";
import RegistrationLayout from "../../auth/components/RegistrationLayout";

const CompanyLocation = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<
    Partial<Record<keyof CompanyLocationData, string>>
  >({});

  const [formData, setFormData] = useState<LocationData>({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const { companyRequestId } = useParams();
console.log(companyRequestId)
  /*
   * Fetch existing location
   *
   * Used when editing/resubmitting an existing Company Request.
   */
  useEffect(() => {
    if (!companyRequestId) {
      return;
    }

    console.log("From location:", companyRequestId);

    const fetchCompanyRequest = async () => {
      try {
        const response =
          await getMyCompanyRequestForEdit(companyRequestId);

        const location = response.data.location;

        console.log("Location:", location);

        setFormData({
          address: location.address || "",
          city: location.city || "",
          state: location.state || "",
          country: location.country || "",
          postalCode: location.postalCode || "",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchCompanyRequest();
  }, [companyRequestId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = companyLocationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof CompanyLocationData, string>
      > = {};

      const errors = result.error.flatten().fieldErrors;

      Object.keys(errors).forEach((key) => {
        const field = key as keyof CompanyLocationData;

        if (errors[field]?.[0]) {
          fieldErrors[field] = errors[field][0];
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});

    if (!companyRequestId) {
      console.error("Company request ID not found");
      return;
    }

    try {
      const response = await updateCompanyLocation(
        companyRequestId,
        formData
      );

      console.log("Company location saved:", response);

      navigate(
        `/register/company-register/${companyRequestId}/documents`
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <RegistrationLayout currentStep={6}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Company Location
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your company's registered address.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleNext}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Address */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Address
            </label>

            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter company address"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />

            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />

            {errors.city && (
              <p className="mt-1 text-sm text-red-500">
                {errors.city}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              State
            </label>

            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />

            {errors.state && (
              <p className="mt-1 text-sm text-red-500">
                {errors.state}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Country
            </label>

            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />

            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="postalCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>

            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#6D3CC9]"
            />

            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.postalCode}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#24113F] px-7 py-2.5 font-medium text-white transition hover:bg-[#321957]"
          >
            Next →
          </button>

        </div>
      </form>

      {/* Location Preview */}
      {/* <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Company Location
        </label>

        <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="mb-2 text-4xl">📍</div>

            <p className="text-sm font-medium">
              Company location will appear here
            </p>

            <p className="mt-1 text-xs">
              Enter the address above to select your location
            </p>
          </div>
        </div>
      </div> */}
    </RegistrationLayout>
  );
};

export default CompanyLocation;