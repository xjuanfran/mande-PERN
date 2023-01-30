import 'date-fns';
import React from 'react'
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Visibility from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InputAdornment from '@mui/material/InputAdornment';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid, Card, Typography, CardContent, TextField, Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import md5 from 'md5';


//type of card, debit or credit
const cardOptions = ['Debito', 'Credito'];

export default function ClientForm() {

  //state for img
  const [img, setImg] = useState(null);

  //Hook to manage the loading state
  const [loading, setLoading] = useState(false);

  //on submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    payM.cvv = encriptarMethodP( payM.cvv);
    payM.card_number = encriptarMethodP( payM.card_number);
    //console.log(payM);
    setLoading(true);

    const dataUser = await fetch('http://localhost:4000/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dataResultUser = await dataUser.json();
    console.log(dataResultUser);

    const dataValidation = await fetch(`http://localhost:4000/PayMethod/Validation/${payM.card_number}`);
    const dataResultValidation = await dataValidation.json();

    if (dataResultValidation.message === false) {
      const dataPayM = await fetch('http://localhost:4000/PayMethod', {
        method: 'POST',
        body: JSON.stringify(payM),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataResultPayM = await dataPayM.json();
      console.log(dataResultPayM);
    } else {
      alert("El metodo de pago ya existe");
    }

    setLoading(false);
  }

  const params = useParams();

  //state for user
  const [user, setUser] = useState({
    user_id: params.id,
    utility_bill: ''
  })

  //handle change for user
  const handleChangeUser = (e) => {
    //console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value })
    setImg(e.target.files[0])
  }

  //state for payment method
  const [payM, setPayM] = useState({
    cvv: '',
    card_number: '',
    card_type: null,
    expiration_date: '',
    user_id: params.id
  })

  function encriptarMethodP(datos){
    return md5(datos);
  }

  //handle change for payment method
  const handleChangePayM = (e) => {
    //console.log(e.target.name, e.target.value);
    setPayM({ ...payM, [e.target.name]: e.target.value })
  }

  //state for show password
  const [showPassword, setShowPassword] = React.useState(false);

  //handle click show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //handle mouse down password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
              padding: "1rem"
            }}
          >
            <Typography
              variant='h5'
              style={{
                textAlign: "center",
                paddingBottom: "1rem"
              }}
            >
              Registro cliente
            </Typography>
            <Typography
              style={{
                color: "black",
                paddingLeft: "1rem",
                fontSize: "1.1rem"
              }}
            >
              Metodo de pago
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cardOptions}
                  onChange={(event, newValue) => { setPayM({ ...payM, card_type: newValue }) }}
                  sx={{
                    display: "block",
                    margin: " -.5rem 0"
                  }}
                  renderInput={(params) => <TextField {...params} label="Tipo de tarjeta" />}
                />
                <TextField
                  variant='outlined'
                  label='Numero de tarjeta'
                  sx={{
                    display: "block",
                    margin: "1.2rem 0",
                  }}
                  name='card_number'
                  onChange={handleChangePayM}
                  InputLabelProps={{ style: { color: 'black' } }}
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
                      onChange={handleChangePayM}
                    />
                  </label>

                </Stack>

                <FormControl
                  sx={{
                    display: "block",
                    width: '14rem',
                    margin: "1rem 0"
                  }}
                  variant="outlined">
                  <InputLabel
                    style={{ color: 'black', margin: " -.2rem 0" }}
                    htmlFor="outlined-adornment-password">Clave de seguridad
                  </InputLabel>
                  <OutlinedInput
                    name='cvv'
                    onChange={handleChangePayM}
                    style={{ height: '3rem' }}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment
                        position="end"
                      >
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
                    label="Clave de seguridad"
                  />
                </FormControl>
                <Typography
                  style={{
                    color: "black",
                    paddingLeft: ".2rem",
                    fontSize: "1.1rem"
                  }}
                >
                  Datos personales
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0}
                >
                  <Typography
                    sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                    style={{ paddingLeft: ".2rem" }} >
                    Factura de servicios
                  </Typography>
                  <IconButton
                    color="inherit"
                    aria-label="upload picture" component="label"
                  >
                    <input
                      hidden accept="image/*"
                      type="file"
                      name='utility_bill'
                      onChange={handleChangeUser}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Stack>
                {img ? <img alt="Preview" height="60" src={URL.createObjectURL(img)} /> : null}
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!payM.card_type && !payM.card_number && !payM.expiration_date && !payM.cvv && !user.utility_bill && !user.name && !user.last_name && !user.email && !user.password && !user.password_confirmation}
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  style={{
                    backgroundColor: "#0a0a23",
                    color: "white",
                    width: "80%",
                    margin: "0 auto",
                    marginTop: "1rem"
                  }}
                >
                  {loading ? <div className="spinner-border" role="status">
                    <span className="visually-hidden"
                    >Loading...
                    </span>
                  </div> : 'Iniciar sesion'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  )
}