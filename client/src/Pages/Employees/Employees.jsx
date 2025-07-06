import React, { useState } from 'react';
import "./Employee.css";
import Header from '../../Components/Header/Header.jsx';
import userpic from "../../assets/images/Profile.svg";
import { useEmployee } from '../../Context/EmployeeContext.jsx';

const Employees = () => {
  const {
    employees,
    deleteEmployee,
    updateEmployee,
    setSearch,
    setPosition,
  } = useEmployee();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setFormData(emp);
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(selectedEmployee._id, formData);
    setShowModal(false);
  };

  return (
    <div className="employees-container">
      <Header title="Employees" image={userpic} />

      <div className="employee">
        <div className="left-controls">
          <select onChange={(e) => setPosition(e.target.value)} defaultValue="">
            <option value="" disabled hidden>Position</option>
            <option>Intern</option>
            <option>Full Time</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>Team Lead</option>
          </select>
        </div>

        <div className="right-controls">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Emp. ID</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) && employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp._id.slice(0, 6).toUpperCase()}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{new Date(emp.doj).toLocaleDateString()}</td>
                  <td className="action-wrapper">
                    <button className="action-btn" onClick={() => toggleMenu(emp._id)}>⋮</button>
                    {openMenuId === emp._id && (
                      <div className="dropdown-menu">
                        <div onClick={() => handleEdit(emp)}>Edit</div>
                        <div onClick={() => handleDelete(emp._id)}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Employee</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name*"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address*"
                required
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number*"
                required
              />
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Department*"
                required
              />
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              >
                <option value="">Position</option>
                <option value="Intern">Intern</option>
                <option value="Full Time">Full Time</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
              </select>
              <input
                type="date"
                value={formData.doj?.slice(0, 10)}
                onChange={(e) => setFormData({ ...formData, doj: e.target.value })}
                required
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
