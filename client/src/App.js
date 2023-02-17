import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
//import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
//import Navbar from './components/Navbar'
import ClientForm from './components/ClientForm'
import EmployeeForm from './components/EmployeeForm'
import Login from './components/Login'
import WorksList from './components/WorksList'
import SetPaymethod from './components/ModifyPaymentMethod'
import HomeVisit from './components/HomeVisit'
import ServicesList from './components/ServicesList';
import VerificationPayM from './components/VerificationPayM'
import EmployeeList from './components/EmployeeList';
import Address from './components/Address';
// import ModifyPaymentMethod from './components/ModifyPaymentMethod';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/person/new" element={<PersonForm />} />
        <Route path="/client/:id/new" element={<ClientForm />} />
        <Route path="/employee/:id/new" element={<EmployeeForm />} />
        <Route path="/workslist/:idWork/:idPerson" element={<WorksList />} />
        <Route path="/login" element={<Login />} />
        <Route path='/setPayMethod/:id' element={<SetPaymethod />} />
        <Route path='/' element={<HomeVisit />} />
        <Route path='/service/record/:id' element={<ServicesList />} />
        <Route path='/verificationPayM/:id' element={<VerificationPayM />} />
        <Route path='/employeeList/:id' element={<EmployeeList />} />
        <Route path='/address/:type/:id' element={<Address />} />
        {/* <Route path="/person" element={<PersonList />} /> */}
        {/*mising route edit person*/}
        {/*mising route edit client*/}
      </Routes>
    </BrowserRouter>
  )
}
