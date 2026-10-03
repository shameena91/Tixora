import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { getSubscriptionPlanThunk } from "../../../../redux/slices/subscriptionPlanSlice";

const ViewPlanDetail = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const {
    viewSubscriptionPlan,
   
  } = useAppSelector((state) => state.subscriptionPlan);

  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionPlanThunk(id));
    }
  }, [id, dispatch]);
  console.log("from detailss",viewSubscriptionPlan)
return(
    <div>
      <h1>{viewSubscriptionPlan?.name}</h1>
      <p>{viewSubscriptionPlan?.description}</p>
    </div>
)
  // UI later
};

export default ViewPlanDetail