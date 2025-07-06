import React from 'react'
import {Routes, Route} from "react-router-dom"
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Candidates from './Pages/Candidates/Candidates'
import Employees from './Pages/Employees/Employees'
import Attendance from './Pages/Attendance/Attendance'
import Leaves from './Pages/Leaves/Leaves'
import Navbar from './Components/Navbar/Navbar'

const App = () => {
  return (
    
 <Routes>
       <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
      
    <Route
          path="/*" element={<>
              <Navbar />
              <Routes>
                          <Route path='/candidates' element={<Candidates/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leaves' element={<Leaves/>}/>
              </Routes>
            </>
          }
        />
        </Routes>
      
  
  )
}

export default App
