import React from 'react'
import { Button } from '@mui/material'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../style-sheet/Home.css'
import git from '../images/git.png'
import instagram from '../images/instragramLogo.png'
import facebook from '../images/faceLogo.png'
import { Link} from 'react-router-dom'

export default function Home() {

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mande</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login">Iniciar sesion</a>
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
        <div className="buttons">
          <Button
            variant="contained"
            style={{
              backgroundColor: '#29323d',
              height: '3rem',
              alignItems: 'center',
            }}
            sx={{ width: '10rem', textAlign: 'center' }}
            onClick={() => {
              window.location.href = '/person/new'
            }}
          >
            Registrate
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#fff',
              color: '#29323d',
              height: '3rem',
              alignItems: 'center',
            }}
            sx={{ width: '10rem', textAlign: 'center', marginLeft: '1rem' }}
            onClick={() => {
              window.location.href = '/login'
            }}
          >
            Inciar sesión
          </Button>
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
