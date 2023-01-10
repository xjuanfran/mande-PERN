import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import PersonList from './components/personList'
import PersonForm from './components/personForm'
import Navbar from './components/Navbar'
import {Container} from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person" element={<PersonList />} />
        <Route path="/person/new" element={<PersonForm />} />
        {/*mising route edit person*/}
      </Routes>
      </Container>
    </BrowserRouter>
  )
}
