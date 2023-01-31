import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import '../style-sheet/EmployeeList.css'
import { useEffect } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'

export default function EmployeeList() {

  const [employee, setEmployee] = useState([])

  const loadInfoEmployee = async () => {
    const response = await fetch("http://localhost:4000/work/getAllMyWorks/31")
    const data = await response.json()
    //console.log(data)
    setEmployee(data)
  }

  useEffect(() => {
    loadInfoEmployee()
  }, [])

  const idPerson = useParams();
  //console.log(idPerson);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={{ pathname: `/${idPerson.id}` }}>Mande</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/">Cerrar sesion</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className='titleMain'>Listado de trabajos</h1>
      {
        employee.map((employee) => (
          <Card
            style={{ marginBottom: '.7rem' }}
          >
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <div>
                <Typography>
                  {employee.names}
                </Typography>
                <Typography>
                  {employee.description}
                </Typography>
                <Typography>
                  {employee.price_hour}
                </Typography>
              </div>
              <div>
                <Button variant='contained' color='inherit' onClick={() => console.log("hola")}>
                  Editar
                </Button>
                <Button variant='contained' color='warning' onClick={() => console.log("ei")}
                style ={{marginLeft: '.5rem'}}>
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </HelmetProvider>
  )
}
