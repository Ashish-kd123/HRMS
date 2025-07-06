import React from 'react';
import './Attendance.css';
import Header from '../../Components/Header/Header';
import userpic from "../../assets/images/Profile.svg";
import { useAttendance } from '../../Context/AttendanceContext';

const Attendance = () => {
  const { attendanceData, updateAttendance, loading } = useAttendance();

  const handleStatusChange = (employeeId, e) => {
    const newStatus = e.target.value;
    updateAttendance(employeeId, newStatus); // Don't send task
  };

  return (
    <div className="attendance-container">
      <Header title="Attendance" image={userpic} />

      <div className="attendance-toolbar">
        <div className="left-controls">
          <select defaultValue="">
            <option value="" disabled hidden>Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Medical Leave</option>
            <option>Work from Home</option>
          </select>
        </div>
        <div className="right-controls">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Emp. ID</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && Array.isArray(attendanceData) && attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.employee._id.slice(0, 6).toUpperCase()}</td>
                  <td>{record.employee.name}</td>
                  <td>{record.employee.position}</td>
                  <td>{record.employee.department}</td>
                  <td>{record.task || "N/A"}</td>
                  <td>
                    <select
                      defaultValue={record.status}
                      className="status-dropdown"
                      onChange={(e) => handleStatusChange(record.employee._id, e)}
                    >
                      <option>Present</option>
                      <option>Absent</option>
                      
                    </select>
                  </td>
                  <td className="action-wrapper">
                    <button className="action-btn">⋮</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Loading or No Attendance Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
