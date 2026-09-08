import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/home/Navbar";
import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";
import { updateCompanyLocation } from "../Services/CompanyRequestService";
import { companyLocationSchema } from "../schema/CompanyLocationSchema";
import type { CompanyLocationData, LocationData } from "../types/companyTypes";



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

const result=companyLocationSchema.safeParse(formData)

if(!result.success){
  const fieldErrors:Partial<Record<keyof CompanyLocationData,string>>={}
  const errors=result.error.flatten().fieldErrors;
  Object.keys(errors).forEach((key)=>{
    const field = key as keyof CompanyLocationData;

    if(errors[field]?.[0]){
      fieldErrors[field]=errors[field][0]
    }
  })
setErrors(fieldErrors)
return
}
setErrors({})


    const companyRequestId=localStorage.getItem("companyRequestId")
console.log("Company Request ID:", companyRequestId);
    if(!companyRequestId)
    {
    console.error("Company request ID not found");
    return
    }
    try {
        const response = await updateCompanyLocation(
      companyRequestId,
      formData
      
    );

    console.log("Company location saved:", response);
 navigate("/register/company-register/documents");

    } catch (error) {
       if(error instanceof Error ){
toast.error(error.message)
     }
}
    
    


   
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar showRegister={false} />

      {/* Registration Area */}
<div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">

        {/* Sidebar */}
        <RegistrationAuthSidebar currentStep={3} />

        {/* Main Content */}
        <main className="flex flex-1 justify-center px-6 py-10 lg:px-12">

          <div className="w-full max-w-4xl">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Company Location
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Enter your company's registered address
              </p>
              
            </div>

            {/* Form */}
            <form
              onSubmit={handleNext}
              className="rounded-xl bg-white p-8 shadow-sm"
            >

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter company address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  />
                    {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  />
                    {errors.state && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  />
                      {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  />
                    {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-8 flex justify-between border-t pt-6">

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-7 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  Next
                </button>

              </div>

            </form>
            <div className="mt-8">
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
</div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default CompanyLocation;