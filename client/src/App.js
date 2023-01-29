import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
//import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Navbar from './components/Navbar'
//import {Container} from '@mui/material'
import ClientForm from './components/ClientForm'
import EmployeeForm from './components/EmployeeForm'
import Login from './components/Login'
import WorksList from './components/WorksList'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/person/new" element={<PersonForm />} />
        <Route path="/client/:id/new" element={<ClientForm />} />
        <Route path="/employee/:id/new" element={<EmployeeForm />} />
        <Route path="/workslist/:id" element={<WorksList />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/person" element={<PersonList />} /> */}
        {/*mising route edit person*/}
        {/*mising route edit client*/}
      </Routes>
    </BrowserRouter>
  )
}
