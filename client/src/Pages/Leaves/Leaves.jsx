import React, { useState, useEffect } from "react";
import "./Leaves.css";
import Header from "../../Components/Header/Header";
import userpic from "../../assets/images/Profile.svg";
import Calendar from "react-calendar";
import axios from "axios";
import docIcon from "../../assets/icons/document@2x.png";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    reason: "",
    document: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const resLeaves = await axios.get("http://localhost:5000/api/leaves");

        setLeaves(Array.isArray(resLeaves.data) ? resLeaves.data : []);
      } catch (err) {
        console.error("Error fetching leaves:", err);
        setLeaves([]);
      }
    };
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      date: "",
      reason: "",
      document: null,
    });
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 const handleSubmit = async e => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const data = new FormData();
data.append("name", formData.name);
    data.append("reason", formData.reason);
    data.append("date", formData.date);
    if (formData.document) data.append("document", formData.document);

    const res = await axios.post(
      "http://localhost:5000/api/leaves/createleaves",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLeaves(prev => [...prev, res.data]); 
    closeModal(); 
  } catch (error) {
    console.error("Failed to submit leave:", error);
    alert("Failed to save leave. Check console.");
  }
};
  const handleStatusChange = async (leaveId, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/leaves/${leaveId}/status`, { status });
      setLeaves(prev =>
        prev.map(l => (l._id === leaveId ? res.data : l))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="leaves-container">
      <Header title="Leaves" image={userpic} />

      <div className="leaves-toolbar">
        <div className="left-controls">
          <select>
            <option>Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="right-controls">
          <input type="text" placeholder="Search..." />
          <button onClick={openModal}>Add Leave</button>
        </div>
      </div>

      <div className="leaves-main">
        <div className="leave-table">
          <table className="leave-data-table">
       <thead>
  <tr>
    <th colSpan="7" className="applied-title-row">Applied Leaves</th>
  </tr>
  <tr>
    
    <th>Name</th>
    <th>Date</th>
    <th>Reason</th>
    <th>Status</th>
    <th>Docs</th>
  </tr>
</thead>
<tbody>
  {leaves.map((leave, index) => (
    <tr key={index}>
     
   <td>{leave.employee}</td>

      <td>{new Date(leave.date).toLocaleDateString()}</td>
      <td>{leave.reason}</td>
      <td>
        <select className="status-dropdown"
          value={leave.status}
          onChange={(e) =>
            handleStatusChange(leave._id, e.target.value)
          }
        >
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </td>
      <td>
        {leave.document ? (
          <a href={leave.document} target="_blank" rel="noreferrer" download>
            <img src={docIcon} className="doc-icon" />
          </a>
        ) : (
          "No File"
        )}
      </td>
    </tr>
  ))}
</tbody>


          </table>
        </div>

        <div className="leave-calendar">
          <div className="calendar-title">Leave Calendar</div>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Leave</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-body">
                <input
                  name="name"
                  type="text"
                  placeholder="Employee Name"
                  onChange={handleChange}
                  required
                  value={formData.name}
                />
                <input
                  name="date"
                  type="date"
                  onChange={handleChange}
                  required
                  value={formData.date}
                />
                <input
                  name="reason"
                  type="text"
                  placeholder="Reason"
                  onChange={handleChange}
                  required
                  value={formData.reason}
                />
                <input name="document" type="file" onChange={handleChange} />
              </div>

              <div className="modal-footer">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
