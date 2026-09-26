import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { CreateSubscriptionPlanFormData } from "../components/CreateSubscriptionPlanModal";
import CreateSubscriptionPlanModal from "../components/CreateSubscriptionPlanModal";
import SubscriptionPlanDetailsModal from "../components/SubscriptionPlanDetailsModal";



import {
  createSubscriptionPlanThunk,
  fetchPlanNamesThunk,
  getAllSubscriptionPlanThunk,
  getSubscriptionPlanThunk,
  updateSubscriptionPlanThunk,
  type SubscriptionPlanDetails,
  type SubScriptionListItems,
  type UpdatePlanStatusPayload,
  planStatusUpdateThunk,
  planDeleteThunk,
} from "../../../redux/slices/subscriptionPlanSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";
import SubscriptionPlanCard from "../components/SubscriptionPlanCard";

const SubscriptionPlan = () => {
  const dispatch = useAppDispatch();

  // ------------------------------------
  // Details Modal
  // ------------------------------------
  const [selectedPlan, setSelectedPlan] =
    useState<SubscriptionPlanDetails | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] =
    useState(false);

  // ------------------------------------
  // Edit Modal
  // ------------------------------------
  const [editingPlan, setEditingPlan] =
    useState<SubscriptionPlanDetails | null>(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  // ------------------------------------
  // Create Modal
  // ------------------------------------
  const [isAddPlanOpen, setIsAddPlanOpen] =
    useState(false);

  // ------------------------------------
  // Redux State
  // ------------------------------------
  const {
    planNames,
    subscriptionPlans,
    createLoading,
    getAllLoading,
  } = useAppSelector(
    (state) => state.subscriptionPlan
  );

  // ------------------------------------
  // Initial Load
  // ------------------------------------
  useEffect(() => {
    dispatch(fetchPlanNamesThunk());
    dispatch(getAllSubscriptionPlanThunk());
  }, [dispatch]);

  // ------------------------------------
  // Create Plan
  // ------------------------------------
  const handleCreatePlan = async (
    data: CreateSubscriptionPlanFormData
  ) => {
    try {
      await dispatch(
        createSubscriptionPlanThunk(data)
      ).unwrap();

      toast.success("Plan created successfully");

      setIsAddPlanOpen(false);

      await dispatch(
        getAllSubscriptionPlanThunk()
      ).unwrap();
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to create subscription plan"
      );

      console.error(
        "Create plan error:",
        error
      );
    }
  };

  // ------------------------------------
  // View Plan
  // ------------------------------------
  const handleViewPlan = async (
    plan: SubScriptionListItems
  ) => {
    try {
      console.log(
        "VIEW PLAN ID:",
        plan.id
      );

      setSelectedPlan(null);

      const details = await dispatch(
        getSubscriptionPlanThunk(plan.id)
      ).unwrap();

      console.log(
        "VIEW PLAN FROM API:",
        details
      );

      setSelectedPlan(details);
      setIsDetailsOpen(true);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to load plan details"
      );

      console.error(
        "Get plan details error:",
        error
      );
    }
  };

  // ------------------------------------
  // Open Edit Modal
  // ------------------------------------
  const handleEditPlan = (
    plan: SubscriptionPlanDetails
  ) => {
    console.log(
      "EDIT PLAN:",
      plan
    );

    setEditingPlan(plan);

    setIsDetailsOpen(false);

    setIsEditOpen(true);
  };

  // ------------------------------------
  // Update Plan
  // ------------------------------------
  const handleUpdatePlan = async (
    id: string,
    data: CreateSubscriptionPlanFormData
  ) => {
    try {
      console.log(
        "UPDATING PLAN:",
        id,
        data
      );

      const updatedPlan = await dispatch(
        updateSubscriptionPlanThunk({
          id,
          data,
        })
      ).unwrap();

      console.log(
        "UPDATED PLAN FROM API:",
        updatedPlan
      );

      setIsEditOpen(false);

      setEditingPlan(null);

      setSelectedPlan(null);

      await dispatch(
        getAllSubscriptionPlanThunk()
      ).unwrap();

      toast.success(
        "Plan updated successfully"
      );
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to update subscription plan"
      );

      console.error(
        "Update plan error:",
        error
      );
    }
  };

  // ------------------------------------
  // Activate / Deactivate
  // ------------------------------------
  const handleToggleStatus = async (
    plan: SubscriptionPlanDetails
  ) => {
    try {
      const nextStatus =
        plan.status === "ACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

      const data: UpdatePlanStatusPayload = {
        status: nextStatus,
      };

      await dispatch(
        planStatusUpdateThunk({
          id: plan.id,
          data,
        })
      ).unwrap();

      const updatedPlan =
        await dispatch(
          getSubscriptionPlanThunk(plan.id)
        ).unwrap();

      setSelectedPlan(updatedPlan);

      await dispatch(
        getAllSubscriptionPlanThunk()
      ).unwrap();

      toast.success(
        nextStatus === "ACTIVE"
          ? "Plan activated successfully"
          : "Plan deactivated successfully"
      );
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to update plan status"
      );
    }
  };

  // ------------------------------------
  // Delete Plan
  // ------------------------------------
  const handleDeletePlan = async (
    plan: SubscriptionPlanDetails
  ) => {
    console.log(
      "Delete plan:",
      plan
    );

    try {
      await dispatch(
        planDeleteThunk(plan.id)
      ).unwrap();

      toast.success(
        "Plan deleted successfully"
      );

      setIsDetailsOpen(false);
      setSelectedPlan(null);

      await dispatch(
        getAllSubscriptionPlanThunk()
      ).unwrap();
    } catch (error) {
      console.error(
        "Delete plan error:",
        error
      );

      toast.error(
        typeof error === "string"
          ? error
          : "Failed to delete subscription plan"
      );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ------------------------------------
          Header
      ------------------------------------ */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center space-x-2 text-xs font-medium text-gray-500">
            <span>Super Admin</span>

            <span>/</span>

            <span className="font-semibold text-indigo-600">
              Plans
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Subscription Plans
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Configure and manage pricing plans for
            Tixora companies.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddPlanOpen(true)
          }
          disabled={createLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <Plus className="h-4 w-4" />

          Add Plan
        </button>
      </div>

      {/* ------------------------------------
          Subscription Plan Cards
      ------------------------------------ */}
      <div className="mx-auto mt-10 flex max-w-[1450px] flex-wrap justify-center gap-5">
        {getAllLoading ? (
          <div className="w-full py-10 text-center text-sm text-gray-500">
            Loading subscription plans...
          </div>
        ) : subscriptionPlans.length === 0 ? (
          <div className="w-full py-10 text-center text-sm text-gray-500">
            No subscription plans found.
          </div>
        ) : (
          subscriptionPlans.map((plan) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              buttonText="View Plan"
              onButtonClick={() =>
                handleViewPlan(plan)
              }
            />
          ))
        )}
      </div>

      {/* ------------------------------------
          Details Modal
      ------------------------------------ */}
      <SubscriptionPlanDetailsModal
        plan={selectedPlan}
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedPlan(null);
        }}
        onEdit={handleEditPlan}
        onToggleStatus={
          handleToggleStatus
        }
        onDelete={handleDeletePlan}
      />

      {/* ------------------------------------
          Edit Subscription Plan Modal
      ------------------------------------ */}
      {isEditOpen && editingPlan && (
        <CreateSubscriptionPlanModal
          key={editingPlan.id}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setEditingPlan(null);
          }}
          planNames={planNames}
          plan={editingPlan}
          onSubmit={(data) => {
            handleUpdatePlan(
              editingPlan.id,
              data
            );
          }}
        />
      )}

      {/* ------------------------------------
          Create Subscription Plan Modal
      ------------------------------------ */}
      {isAddPlanOpen && (
        <CreateSubscriptionPlanModal
          isOpen={isAddPlanOpen}
          onClose={() => {
            setIsAddPlanOpen(false);
          }}
          planNames={planNames}
          onSubmit={handleCreatePlan}
        />
      )}
    </div>
  );
};

export default SubscriptionPlan;