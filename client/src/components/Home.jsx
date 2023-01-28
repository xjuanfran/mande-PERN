import React from 'react'
import { Button } from '@mui/material'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../style-sheet/Home.css'
import git from '../images/git.png'
import instagram from '../images/instragramLogo.png'
import facebook from '../images/faceLogo.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
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
      <div className="jobsSection">
        <h1 className="titleJobs">Servicios ofrecidos en nuestra pagina</h1>
        <div className='containerListW'>
          {work.map((work) => (
            <Link to="/person/new" key={work.work_id}><h2 className="worksList">{work.names}</h2></Link>
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
