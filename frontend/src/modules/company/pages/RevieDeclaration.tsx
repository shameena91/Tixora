import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/home/navbar";
import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";

const ReviewDeclaration = () => {
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfirmed) return;

    // Final API submission will be added later
    console.log("Registration submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar showRegister={false} />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}

        <RegistrationAuthSidebar currentStep={5} />

        {/* Main Content */}

        <main className="flex flex-1 justify-center px-6 py-10 lg:px-12">

          <div className="w-full max-w-3xl">

            {/* Header */}

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Review & Declaration
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Please review your information and confirm the declaration
                before submitting.
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
                  Please make sure that the company information,
                  location details, and uploaded documents you provided
                  are correct and complete.
                </p>

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
                        setIsConfirmed(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />

                    <span className="text-sm leading-6 text-gray-600">
                      I hereby declare that all the information and
                      documents provided by me are true, accurate, and
                      complete to the best of my knowledge. I understand
                      that the submitted information will be reviewed by
                      the administrator and that providing false or
                      misleading information may result in rejection of
                      the company registration request.
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

          </div>

        </main>
      </div>
    </div>
  );
};

export default ReviewDeclaration;