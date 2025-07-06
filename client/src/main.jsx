
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { CandidateProvider } from './Context/CandidateContext.jsx'
import { EmployeeProvider } from './Context/EmployeeContext.jsx'
import { AttendanceProvider } from './Context/AttendanceContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 
 <AuthProvider>
  <EmployeeProvider>
  <CandidateProvider>
   <AttendanceProvider>
     <App /> 
     </AttendanceProvider>
      </CandidateProvider>
      </EmployeeProvider>
    </AuthProvider>
 
 </BrowserRouter>
    
  
)
