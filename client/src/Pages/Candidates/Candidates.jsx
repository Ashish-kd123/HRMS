import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import userpic from "../../assets/images/Profile.svg"
import "./Candidates.css"
import { useEmployee } from '../../Context/EmployeeContext';

import { useCandidates } from '../../Context/CandidateContext'


const Candidates = () => {

  const {
    candidates,
    addCandidate,
    deleteCandidate,
    downloadResume,
    moveToEmployee,
    updateCandidate,
  } = useCandidates();

  const { fetchEmployees } = useEmployee();

  const[showModal, setShowModal] =useState(false)

  const [openMenuId, setOpenMenuId] = useState(null)

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    position: "",
    experience: "",
    resume: null,
  });
  const toggleMenu = (id) => {
    setOpenMenuId(prev => prev === id ? null : id);
  };

   const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    await addCandidate(data);

     setFormData({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      position: "",
      experience: "",
      resume: null,
    });
    setShowModal(false); 
  };

   const handleStatusChange = async (id, newStatus) => {
    if (newStatus === "selected") {
      await moveToEmployee(id, newStatus, fetchEmployees); 
    } else {
      await updateCandidate(id, { status: newStatus });
    }
  };

   return (
    <div className="candidates-container">
      <Header title="Candidates" image={userpic} />

      <div className="candidate">
        <div className="left-controls">
          <select defaultValue="">
            <option value="" disabled hidden>
              Status
            </option>
            <option>New</option>
            <option>Scheduled</option>
            <option>Ongoing</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Position
            </option>
            <option>Intern</option>
            <option>Developer</option>
            <option>Human Resource</option>
          </select>
        </div>

        <div className="right-controls">
          <input type="text" placeholder="Search..." />
          <button onClick={() => setShowModal(true)}>Add Candidate</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Candidate</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address*"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Position*"
                value={formData.position}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="experience"
                placeholder="Experience*"
                value={formData.experience}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                required
              />

              <div className="declaration-wrapper">
                <label className="declaration">
                  <input type="checkbox" required />
                  I hereby declare that the above information is true to the best of my knowledge and belief.
                </label>
              </div>

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(candidates) && candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr key={candidate._id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.emailAddress}</td>
                  <td>{candidate.phoneNumber}</td>
                  <td>{candidate.position}</td>
                  <td>{candidate.experience}</td>
                  <td>
                    <select
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="new">New</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="action-wrapper">
                    <button className="action-btn" onClick={() => toggleMenu(candidate._id)}>⋮</button>
                    {openMenuId === candidate._id && (
                      <div className="dropdown-menu">
                        <div onClick={() => downloadResume(candidate._id)}>
                          Download Resume
                        </div>
                        <div
                          onClick={() => deleteCandidate(candidate._id)}
                          style={{ color: "red" }}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Candidates;