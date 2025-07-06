import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

 const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

const fetchEmployees = async () => {
  try {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/api/employees/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmployees(res.data);
  } catch (error) {
    console.error("Error fetching employees:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


  const addEmployee = (newEmployee) => {
    setEmployees((prev) => {
      const exists = prev.find((emp) => emp._id === newEmployee._id);
      if (!exists) return [...prev, newEmployee];
      return prev;
    });
  };

  const updateEmployee = async (id, data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const res = await axios.put(`http://localhost:5000/api/employees/${id}/edit`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees((prev) =>
      prev.map((emp) => (emp._id === id ? res.data : emp))
    );
  } catch (error) {
    console.error("Error updating employee:", error.response?.data || error.message);
  }
};


  const deleteEmployee = async (id) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    await axios.delete(`http://localhost:5000/api/employees/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  } catch (error) {
    console.error("Error deleting employee:", error.response?.data || error.message);
  }
};


  useEffect(() => {
    fetchEmployees();
    
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
