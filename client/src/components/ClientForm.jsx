import 'date-fns';
import React from 'react'
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import DateFnsUtils from '@date-io/date-fns';
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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Grid, Card, Typography, CardContent, TextField, Button } from '@mui/material'


//type of card, debit or credit
const cardOptions = ['Debito', 'Credito'];

export default function ClientForm() {

  //state for img
  const [img, setImg] = useState(null);

  //on submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, payM);
  }

  //state for user
  const [user, setUser] = useState({
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
    cardType: null,
    expiration_date: ''
  })

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

  //state for date
  const [selectedDate, setSelectedDate] = React.useState(new Date('2023-01-11T21:11:54'));

  //handle change date
  const handleDateChange = (date, newValue) => {
    setSelectedDate(date);
    setPayM({ ...payM, expiration_date: newValue })
  };

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
                  onChange={(event, newValue) => { setPayM({ ...payM, cardType: newValue }) }}
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
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  name='expiration_date'
                >
                  <KeyboardDatePicker
                    margin=".5 rem 0"
                    display="block"
                    style={{
                      width: "14rem",
                      display: "block",
                      margin: "-0.7rem 0 1rem 0"
                    }}
                    id="date-picker-dialog"
                    label="Fecha de expiracion"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControl
                  sx={{
                    display: "block",
                    width: '14rem',
                    margin: ".5rem 0"
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
                  Crear cuenta
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  )
}
