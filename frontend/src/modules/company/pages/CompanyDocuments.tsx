import { useState } from "react";
import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";
import Navbar from "../../../components/home/navbar";
import {  useNavigate } from "react-router-dom";

const CompanyDocuments = () => {
  const [documents, setDocuments] = useState({
    registrationCertificate: null as File | null,
    taxDocument: null as File | null,
    businessLicense: null as File | null,
  });
const navigate=useNavigate()
  const handleFileChange = (
    name: keyof typeof documents,
    file: File | null
  ) => {
    setDocuments((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
navigate("/register/company-register/review-declaration")
    console.log("Documents:", documents);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
     <Navbar showRegister={false} />
     <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">

     {/* <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-8xl gap-8 px-5 lg:px-8"> */}
        {/* Sidebar */}
        <RegistrationAuthSidebar currentStep={3} />

      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 bg">
            Company Documents
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Upload the required company documents
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-sm"
        >

          <div className="space-y-6">

            {/* Registration Certificate */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Certificate
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileChange(
                    "registrationCertificate",
                    e.target.files?.[0] ?? null
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />

              {documents.registrationCertificate && (
                <p className="mt-2 text-sm text-gray-500">
                  {documents.registrationCertificate.name}
                </p>
              )}
            </div>

            {/* Tax Document */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tax Document
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileChange(
                    "taxDocument",
                    e.target.files?.[0] ?? null
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />

              {documents.taxDocument && (
                <p className="mt-2 text-sm text-gray-500">
                  {documents.taxDocument.name}
                </p>
              )}
            </div>

            {/* Business License */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Business License
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileChange(
                    "businessLicense",
                    e.target.files?.[0] ?? null
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />

              {documents.businessLicense && (
                <p className="mt-2 text-sm text-gray-500">
                  {documents.businessLicense.name}
                </p>
              )}
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex justify-between border-t pt-6">

            <button
              type="button"
              onClick={() =>
                window.history.back()
              }
              className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-7 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Submit Registration
            </button>

          </div>

        </form>
      </div>
      </div>
    </div>
  );
};

export default CompanyDocuments;