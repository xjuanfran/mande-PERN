import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Card, CardContent, TextField, Typography, Grid, Button, CircularProgress } from "@mui/material";
import md5 from 'md5';


export default function VerificationPayM() {

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function encriptarPassword(password) {
    return md5(password);
  }

  const [dataCard, setDataCard] = useState({
    cvv: '',
    card_number: '',
  })

  const handleChange = (e) => {
    setDataCard({ ...dataCard, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //console.log(dataCard);

    //console.log(dataCard.cvv);
    // console.log(dataCard.card_number);
    //console.log(encriptarPassword(dataCard.cvv));
    //console.log(encriptarPassword(dataCard.card_number));
    dataCard.cvv = encriptarPassword(dataCard.cvv);
    dataCard.card_number = encriptarPassword(dataCard.card_number);

    const response = await fetch(`http://localhost:4000/PayMethod/ValidationUser/${idPerson.id}/${dataCard.card_number}`);
    const data = await response.json();
    console.log(data);

    setLoading(false);

  }

const idPerson = useParams();
//console.log(idPerson.id);

return (
  <HelmetProvider>
    <Helmet>
      <style>{"body { background-color: #003748; }"}</style>
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
    <Grid
      container
      direction="column"
      alignItems="center" //vertical
      justifyContent="center" //horizontal
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5, borderRadius: ".5rem" }}
          style={{
            backgroundColor: "#f7f6f6",
            padding: "1rem",
          }}
        >
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginBottom: "-2.7rem",
            }}
          >
            Ingresa tus datos
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Número de tarjeta"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="card_number"
                onChange={handleChange}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <FormControl
                sx={{ width: '29ch' }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name='cvv'
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled=
                {
                  !dataCard.cvv || dataCard.cvv.length > 3 || dataCard.cvv.length < 3
                }
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                style={{
                  color: "white",
                  width: "70%",
                  margin: "0 auto",
                  marginTop: "1rem",
                }}
              >
                {loading ? <CircularProgress color="inherit" size={14} /> : "Verificar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </HelmetProvider>
)
}
