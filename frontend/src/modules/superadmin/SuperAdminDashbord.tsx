import { useContext } from "react";
import Navbar from "../../components/home/Navbar";

import { AuthContext } from "../auth/context/AuthContext"




function Dashbord() {

   const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      {/* Navbar */}
     <Navbar  showLogin={false} showRegister={false} name={auth?.userName}/>
       
      {/* Main */}
<p>superAdmin</p>
<h1>{auth?.userName}</h1>
      
    </div>
  );
}

export default Dashbord;