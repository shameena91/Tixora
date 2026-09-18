
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../auth/context/AuthContext";
import Navbar from "../../../components/home/Navbar";
import { getMyCompanyRequest } from "../Services/CompanyRequestService";
import { CompanyRequestStatus } from "../components/CompanyRequestStatus";
import type { CompanyRequestStatusProps } from "../types/companyTypes";

function CheckStatus() {
  const auth = useContext(AuthContext);
  const [companyRequest, setCompanyRequest] =
  useState<CompanyRequestStatusProps | null>(null);

  console.log("Auth is",auth)

  useEffect(()=>{
    const myReq=async()=>{
      const response=await getMyCompanyRequest()
      setCompanyRequest(response.data) 
    }
    myReq()
  },[])

 
  console.log("statuwwwwwwwww",companyRequest)

  if (!companyRequest) {
    return <div>Loading...</div>;
  }
return (
  <>
    <Navbar
      showLogin={false}
      showRegister={false}
      name={auth?.userName}
    />

    <CompanyRequestStatus
    companyRequestId={companyRequest.companyRequestId}
      status={companyRequest.status}
      reviewRemarks={companyRequest.reviewRemarks}
    />
  </>
);
   

 
}

export default CheckStatus;

