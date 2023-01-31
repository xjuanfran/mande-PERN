import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { Card, CardContent, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, useNavigate } from 'react-router-dom';
//import crypto from "crypto";
import md5 from 'md5';


const kindUser = [
  { label: 'Cliente' },
  { label: 'Empleado' }
];

export default function InputAdornments() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [kindPerson, setKindPerson] = useState({
    type_user: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //console.log(person.password);
    //console.log(encriptarPassword(person.password));
    person.password = encriptarPassword(person.password);
    let continuePage = false;
    let id = 0;
    
    //Valida si el correo o el telefono ya existen donde en caso de que exista devuelve True y en caso de que no exista devuelve False
    const dataValidation = await fetch('http://localhost:4000/person/validation', {
      method: 'POST',
      body: JSON.stringify(person),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dataResultValidation = await dataValidation.json();
    //Crea en base de los datos la persona y la direccion si la validacion es false
    if (dataResultValidation.message === false) {
      continuePage = true;
      const data = await fetch('http://localhost:4000/person', {
        method: 'POST',
        body: JSON.stringify(person),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataResult = await data.json();
      console.log(dataResult);
      id = dataResult.person_id;
      //Contruye el objeto completo para enviar a la tabla address
      const completeAddress = {
        description: address.description,
        person_id: dataResult.person_id
      }
      //Envia el objeto completo a la tabla address
      const dataAddress = await fetch('http://localhost:4000/address', {
        method: 'POST',
        body: JSON.stringify(completeAddress),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataResultAddress = await dataAddress.json();
      console.log(dataResultAddress);
    } else {
      continuePage = false;
    }

    setLoading(false);

    if (continuePage === true) {
      if (kindPerson.type_user.label === 'Cliente') {
        navigate(`/client/${id}/new`)
      } else if (kindPerson.type_user.label === 'Empleado') {
        navigate(`/employee/${id}/new`)
      }
    }
    else {
      alert('El correo o el telefono ya existen')
    }
  }

  const [person, setPerson] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  })
  
  function encriptarPassword(password){
    return md5(password);
  }
  
  const handleChangePerson = (e) => {
  // console.log(e.target.name, e.target.value);

    setPerson({ ...person, [e.target.name]: e.target.value })
  }

  const [address, setAddress] = useState({
    description: '',
    person_id: ''
  })

  const handleChangeAddress = (e) => {
    //console.log(e.target.name, e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

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
                marginBottom: "-2.7rem"
              }}
            >
              Registrate
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  label='Nombre completo'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='first_name'
                  onChange={handleChangePerson}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Apellidos'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='last_name'
                  onChange={handleChangePerson}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Correo electronico'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='email'
                  onChange={handleChangePerson}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Telefono/celular'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='phone'
                  onChange={handleChangePerson}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Direccion'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='description'
                  onChange={handleChangeAddress}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={kindUser}
                  onChange={(event, newValue) => { setKindPerson({ ...kindPerson, type_user: newValue }) }}
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  renderInput={(params) => <TextField {...params} label="Seleccione un tipo" />}
                />
                <FormControl
                  sx={{ width: '26ch' }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name='password'
                    onChange={handleChangePerson}
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
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!person.first_name || !person.last_name || !person.email || !person.phone || !person.password || !kindPerson.type_user || !address.description}
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  style={{
                    color: "white",
                    width: "70%",
                    margin: "0 auto",
                    marginTop: "1rem"
                  }}
                >
                  {loading ? <CircularProgress color="inherit" size={14}/> : "Registrarse"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}