import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/attendance/getattendance", authHeader);
      setAttendanceData(res.data || []);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (employeeId, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance/mark",
        { employeeId, status },
        authHeader
      );

      setAttendanceData((prev) =>
        prev.map((record) =>
          record.employee._id === employeeId
            ? { ...record, status }
            : record
        )
      );
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <AttendanceContext.Provider value={{ attendanceData, updateAttendance, loading }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
