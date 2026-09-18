
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";



import {
  getCompanyRequest,
  resubmitCompanyRequest,
  submitCompanyRegistration,
} from "../Services/CompanyRequestService";

import type { CompanyRequest } from "../types/companyTypes";
import RegistrationLayout from "../../auth/components/RegistrationLayout";

const ReviewDeclaration = () => {
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [loading, setLoading] = useState(true);

  const [companyRequest, setCompanyRequest] =
    useState<CompanyRequest | null>(null);

  const { companyRequestId } = useParams();

  useEffect(() => {
    const fetchCompanyRequest = async () => {
      if (!companyRequestId) {
        console.error("Company request ID not found");
        return;
      }

      try {
        const result =
          await getCompanyRequest(companyRequestId);

        console.log("Company request:", result);

        setCompanyRequest(result.data);
      } catch (error) {
        console.error(
          "Failed to fetch company request:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyRequest();
  }, [companyRequestId]);

  if (loading) {
    return (
      <RegistrationLayout currentStep={8}>
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading...
          </p>
        </div>
      </RegistrationLayout>
    );
  }

  if (!companyRequest) {
    return (
      <RegistrationLayout currentStep={8}>
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Company request not found
          </p>
        </div>
      </RegistrationLayout>
    );
  }

  const isResubmit =
    companyRequest.status === "MORE_INFO_REQUIRED" ||
    companyRequest.status === "REJECTED";

  console.log("Is resubmit", isResubmit);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!companyRequestId) {
      console.error("Company request ID not found");
      return;
    }

    if (!isConfirmed) {
      return;
    }

    const accountId =
      localStorage.getItem("accountId");

    if (!accountId) {
      console.error("Account not found");
      return;
    }

    try {
      let result;

      if (
        companyRequest.status === "MORE_INFO_REQUIRED" ||
        companyRequest.status === "REJECTED"
      ) {
        result =
          await resubmitCompanyRequest(
            companyRequestId
          );
      } else {
        result =
          await submitCompanyRegistration(
            accountId,
            companyRequestId
          );
      }

      console.log(
        "Registration submitted:",
        result
      );

      toast.success(
        "Registration submitted successfully"
      );

      navigate(
        isResubmit
          ? "/register/company-register/success?resubmit=true"
          : "/register/company-register/success"
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to submit Register",
          error.message
        );

        toast.error("Failed to register");
      }
    }
  };

  return (
    <RegistrationLayout currentStep={8}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Review & Declaration
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Please review your information and confirm
          the declaration before submitting.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-8 shadow-sm"
      >
        {/* Review Message */}

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-semibold text-gray-900">
            Review Your Information
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Please make sure that the company
            information, location details, and uploaded
            documents you provided are correct and
            complete.
          </p>
        </div>

        {/* Company Information */}

        <div className="mt-6 rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Company Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Company Name
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.companyName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Registration Number
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.registrationNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Company Email
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.companyEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Company Type
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.companyType}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Number of Employees
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.numberOfEmployees}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}

        <div className="mt-6 rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Location
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.location.address}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                City
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.location.city}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                State
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.location.state}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Country
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.location.country}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Postal Code
              </p>

              <p className="font-medium text-gray-900">
                {companyRequest.location.postalCode}
              </p>
            </div>
          </div>
        </div>

        {/* Documents */}

        <div className="mt-6 rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Documents
          </h2>

          <div className="mt-4 space-y-3">
            {companyRequest.documents.map(
              (document) => (
                <div
                  key={document.fileName}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {document.documentType}
                    </p>

                    <p className="text-sm text-gray-500">
                      {document.fileName}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Declaration */}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Declaration
          </h2>

          <div className="mt-4 rounded-lg border border-gray-200 p-5">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) =>
                  setIsConfirmed(
                    e.target.checked
                  )
                }
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm leading-6 text-gray-600">
                I hereby declare that all the
                information and documents provided by
                me are true, accurate, and complete to
                the best of my knowledge. I understand
                that the submitted information will be
                reviewed by the administrator and that
                providing false or misleading information
                may result in rejection of the company
                registration request.
              </span>
            </label>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={!isConfirmed}
            className="rounded-lg bg-blue-600 px-7 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </RegistrationLayout>
  );
};

export default ReviewDeclaration;

