

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EmployeeForm from "../../componenets/employees/EmployeeForm";


const CreateEmployeePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Add Employee
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new employee to your company.
          </p>
        </div>
      </div>

      <EmployeeForm
        mode="create"
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default CreateEmployeePage;

