import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates/get", authHeader);
      setCandidates(res.data || []);
    } catch (err) {
      console.error("Failed to fetch candidates:", err);
      setCandidates([]);
    }
  };

  const addCandidate = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/candidates/create", formData, {
        ...authHeader,
        headers: {
          ...authHeader.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCandidates();
    } catch (err) {
      console.error("Error adding candidate:", err);
    }
  };

  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${id}/delete`, authHeader);
      fetchCandidates();
    } catch (err) {
      console.error("Error deleting candidate:", err);
    }
  };

  const updateCandidate = async (id, data) => {
    try {
      await axios.put(`http://localhost:5000/api/candidate/${id}/update`, data, authHeader);
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...data } : c))
      );
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const downloadResume = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/candidates/${id}/download`, {
        responseType: "blob",
        ...authHeader,
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading resume:", err);
    }
  };

  const moveToEmployee = async (id, status, onSuccess) => {
    try {
      await axios.post(
        `http://localhost:5000/api/candidates/status/${id}`,
        { status },
        authHeader
      );
      await fetchCandidates();
      if (typeof onSuccess === "function") {
        onSuccess(); 
      }
    } catch (err) {
      console.error("Error moving candidate to employee:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        addCandidate,
        deleteCandidate,
        updateCandidate,
        downloadResume,
        fetchCandidates,
        moveToEmployee,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidateContext);
