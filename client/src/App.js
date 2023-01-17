import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Navbar from './components/Navbar'
import {Container} from '@mui/material'
import ClientForm from './components/ClientForm'
import EmployeeForm from './components/EmployeeForm'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person" element={<PersonList />} />
        <Route path="/person/new" element={<PersonForm />} />
        <Route path="/client/:id/new" element={<ClientForm />} />
        <Route path="/employee/new" element={<EmployeeForm />} />
        {/*mising route edit person*/}
        {/*mising route edit client*/}
      </Routes>
      </Container>
    </BrowserRouter>
  )
}
