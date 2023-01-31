import * as React from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, TextField, Typography, Button, CircularProgress, } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import md5 from 'md5';

const kindCard = [
  { label: 'Debito' },
  { label: 'Credito' }
];

export default function InputAdornments() {

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function encriptarPassword(password){
    return md5(password);
  }

  //state for payment method
  const [dataCard, setDataCard] = useState({
    cvv: '',
    card_number: '',
    card_type: '',
    expiration_date: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // console.log(dataCard.cvv);
    // console.log(dataCard.card_number);
    // console.log(encriptarPassword(dataCard.cvv));
    // console.log(encriptarPassword(dataCard.card_number));
    dataCard.cvv = encriptarPassword(dataCard.cvv);
    dataCard.card_number = encriptarPassword(dataCard.card_number);

    console.log(dataCard);

    const response = await fetch(`http://localhost:4000/PayMethod/Validation/`, {
      method: 'PUT',
      body: JSON.stringify(dataCard),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    setLoading(false);
  };

  //Take the values of the inputs and save them in the state
  const handleChangesCard = (e) => {
    //console.log(e.target.value);
    setDataCard({ ...dataCard, [e.target.name]: e.target.value });
  };

  const idPerson = useParams();
  //console.log(idPerson.id);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: #003748; }"}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={{ pathname: `/${idPerson.id}` }}>Mande</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/person/new">Iniciar sesion</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/">Servicios</a></li>
                  <li><Link className="dropdown-item" to={{ pathname: `/setPayMethod/${idPerson.id}` }}>Modificar método de pago</Link></li>
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
                  onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: "black" } }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={kindCard}
                  onChange={(event, newValue) => { setDataCard({ ...dataCard, card_type: newValue.label }) }}
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  renderInput={(params) => <TextField {...params} label="Seleccione un tipo" />}
                />
                <Stack>
                  <label
                    style={{ color: 'black', margin: " -.2rem 0" }}
                  >
                    Fecha de expiracion
                    <input
                      type="Date"
                      name="expiration_date"
                      style={{
                        display: "block",
                        width: '14rem',
                        height: '3rem',
                        margin: "1rem 0",
                        backgroundColor: "#f7f6f6",
                        border: "1px solid #003748",
                      }}
                      onChange={handleChangesCard}
                    />
                  </label>
                </Stack>
                <FormControl
                  sx={{ width: '29ch' }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name='cvv'
                    onChange={handleChangesCard}
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
                  disabled={!dataCard.card_number || !dataCard.card_type || !dataCard.expiration_date || dataCard.cvv.length < 3 || dataCard.cvv.length > 3}
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
                   {loading ? <CircularProgress color="inherit" size={14}/> : "Actualizar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}
