import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useState } from 'react';


export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(person, address);
  }

  const [person, setPerson] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleChangePerson = (e) => {
    //console.log(e.target.name, e.target.value);
    setPerson({...person, [e.target.name]: e.target.value})
  }

  const [address, setAddress] = useState({
    latitude: '',
    longitude: ''
  })

  const handleChangeAddress = (e) => {
    //console.log(e.target.name, e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #0a0a23; }'}</style>
      </Helmet>
      <Grid
        container
        direction="column"
        alignItems="center" //vertical
        justifyContent="center" //horizontal
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5 }}
            style={{
              backgroundColor: "#f7f6f6",
              padding: "1rem"
            }}
          >
            <Typography>
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
                  label='Latitud'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='latitude'
                  onChange={handleChangeAddress}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Longitud'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='longitude'
                  onChange={handleChangeAddress}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <FormControl sx={{ width: '26ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                >
                  Siguiente
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}