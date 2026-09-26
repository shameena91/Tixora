import { useContext, useEffect } from "react";

import Navbar from "../../../components/home/Navbar";
import {
  getAllSubscriptionPlanThunk,
  selectSubscriptionPlanThunk,
  type SubScriptionListItems,
} from "../../../redux/slices/subscriptionPlanSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import SubscriptionPlanCard from "../../superadmin/components/SubscriptionPlanCard";
import { AuthContext } from "../../auth/context/AuthContext";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CompanySubscriptionPlans = () => {
  const dispatch = useAppDispatch();

  const auth = useContext(AuthContext);
  const navigate=useNavigate()

  const {
    subscriptionPlans,
    getAllLoading,
  } = useAppSelector(
    (state) => state.subscriptionPlan
  );

  // ------------------------------------
  // Load Plans
  // ------------------------------------
  useEffect(() => {
    dispatch(getAllSubscriptionPlanThunk());
  }, [dispatch]);

const handleSelectPlan=async (planId:string)=>{
 console.log("SELECT PLAN:",planId);
  try {
    await dispatch(
      selectSubscriptionPlanThunk({
        planId,
        billingCycle: "MONTHLY",
      })
    ).unwrap();

    toast.success(
      "Subscription plan selected successfully"
    );

    navigate("/Company-admin/dashboard");
  } catch (error) {
    toast.error(
      typeof error === "string"
        ? error
        : "Failed to select subscription plan"
    );
  }
};


  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* ------------------------------------
          Navbar
      ------------------------------------ */}
      <div className="w-full border-b border-gray-100 bg-white">
        <Navbar
          showLogin={false}
          showRegister={false}
          name={auth?.userName}
        />
      </div>

      {/* ------------------------------------
          Main Content
      ------------------------------------ */}
      <main className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        {/* ------------------------------------
            Header
        ------------------------------------ */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Choose Your Plan
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Choose a subscription plan that fits
            your company needs.
          </p>
        </div>

        {/* ------------------------------------
            Plans
        ------------------------------------ */}
        <section className="mt-12">
          {getAllLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-500">
                Loading subscription plans...
              </p>
            </div>
          ) : subscriptionPlans.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-500">
                No subscription plans available.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {subscriptionPlans.map(
                (plan: SubScriptionListItems) => (
                  <div
                    key={plan.id}
                    className="flex w-full justify-center sm:w-[340px]"
                  >
                    <SubscriptionPlanCard
                      plan={plan}
                      buttonText="Select Plan"
                      onButtonClick={() => 
                       
                        handleSelectPlan(plan.id)
                      }
                    />
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CompanySubscriptionPlans;