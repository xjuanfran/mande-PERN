import { Card, Grid, Typography, CardContent } from '@mui/material'
import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import avatar from '../images/avatar.png'
import avatarID from '../images/avatarID.png'


export default function EmployeeForm() {

  //state for img
  const [img, setImg] = useState(null);
  const [imgID, setImgID] = useState(null);

  //handle change for imgID
  const handleChangeImgID = (e) => {
    
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImgID(e.target.files[0])
  }

  //state for employee  
  const [employee, setEmployee] = useState({
    photo_id: '',
    profile_picture: ''
  })

  //handle change for employee
  const handleChangeEmployee = (e) => {
    //console.log(e.target.name, e.target.value);
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImg(e.target.files[0])
  }
  

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5, borderRadius: ".5rem" }}
            style={{
              backgroundColor: "#f7f6f6",
              padding: "1rem"
            }}
          >
            <Typography
              variant='h5'
            >
              Registro empleado
            </Typography>
            <CardContent>
              <form>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0}
                >
                  <Typography
                    sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                    style={{ paddingLeft: "2.2rem" }} >
                    Foto de perfil
                  </Typography>
                  <IconButton
                    color="inherit"
                    aria-label="upload picture" component="label"
                  >
                    <input
                      hidden accept="image/*"
                      type="file"
                      name='profile_picture'
                      onChange={handleChangeEmployee}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Stack>
                <div style={{paddingLeft: "1rem"}}>
                {img ? <img alt="Foto de perfil" style={{borderRadius: "100%", width: "9.5rem", height: "9rem"}} src={URL.createObjectURL(img)} /> : <img alt="Foto perfil predeterminada"  style={{borderRadius: "100%", width: "9.5rem", height: "9rem"}} src={avatar}/>}
                </div>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0}
                >
                  <Typography
                    sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                    style={{ paddingLeft: ".7rem" }} >
                    Foto identificacion
                  </Typography>
                  <IconButton
                    color="inherit"
                    aria-label="upload picture" component="label"
                  >
                    <input
                      hidden accept="image/*"
                      type="file"
                      name='profile_picture'
                      onChange={handleChangeImgID}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Stack>
                <div style={{paddingLeft: ".5rem"}}>
                {imgID ? <img alt="Foto documento de identidad" style={{width: "10rem", height: "7rem"}} src={URL.createObjectURL(imgID)} /> : <img alt="Foto documento predeterminada" style={{width: "10rem", height: "7rem"}} src={avatarID}/>}
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>

  )
}
