import React from 'react'
import { Button } from '@mui/material'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../style-sheet/Home.css'

export default function Home() {
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
            sx={{ width: '10rem', textAlign: 'center', marginLeft: '1rem'}}
            onClick={() => {
              window.location.href = '/login'
            }}
          >
            Inciar sesión
          </Button>
        </div>
      </div>
    </HelmetProvider>
  )
}
