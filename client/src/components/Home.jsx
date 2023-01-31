import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../style-sheet/Home.css'
import git from '../images/git.png'
import instagram from '../images/instragramLogo.png'
import facebook from '../images/faceLogo.png'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Home() {

  const [work, setWork] = useState([])

  const loadWorks = async () => {
    const response = await fetch("http://localhost:4000/work/active")
    const data = await response.json()
    console.log(data)
    setWork(data)
  }

  useEffect(() => {
    loadWorks()
  }, [])

  const idPerson = useParams();
  console.log(idPerson);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={{pathname: `/${idPerson.id}`}}>Mande</Link>
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
                <li><Link className="dropdown-item" to={{pathname: `/service/record/${idPerson.id}`}}>Historial de servicios</Link></li>
                <li><Link className="dropdown-item" to={{pathname: `/setPayMethod/${idPerson.id}`}}>Modificar método de pago</Link></li>
                <li><a className="dropdown-item" href="/">Cerrar sesion</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      <div className="about">
        <h1 className="titleHome">MANDE</h1>
        <div className="textAbout">
          <p>
            Mande, es una aplicación web que permite, desde tu dispositivo, conseguir que personas trabajadoras, expertas y honestas realicen las tareas del día a día en casa.
          </p>
        </div>
      </div>
      <div className="jobsSection">
        <h1 className="titleJobs">Servicios ofrecidos en nuestra pagina</h1>
        <div className='containerListW'>
          {work.map((work) => (
            <Link  to={{pathname: `/workslist/${work.work_id}/${idPerson.id}`}} key={work.work_id}><h2 className="worksList">{work.names}</h2></Link>
          ))
          }
        </div>
      </div>
      <footer className="footer-distributed cssFooter">
        <div className="footer-right">
          <img src={git} alt="Logo gitHub" className='git' />
          <img src={facebook} alt="Logo facebook" className='faceLogo' />
          <img src={instagram} alt="Logo instragram" className='logoInstragram' />
        </div>
        <div className="footer-left">
          <p className="footer-links">
            <a className="link-1" href="/">Home</a>
          </p>
          <p>Mande &copy; 2023</p>
        </div>
      </footer>
    </HelmetProvider>
  )
}
