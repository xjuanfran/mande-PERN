import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Grid, Card, Typography, CardContent, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



//type of card, debit or credit
const cardType = [
  { label: 'Debito' },
  { label: 'Credito' }
];

export default function ClientForm() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2023-01-11T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
              }}
            >
              Registro cliente
            </Typography>
            <CardContent>
              <form>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cardType}
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  renderInput={(params) => <TextField {...params} label="Tipo de tarjeta" />}
                />
                <TextField
                  variant='outlined'
                  label='Numero de tarjeta'
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name='card_number'
                  //onChange={handleChangePerson}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin=".5 rem 0"
                    display="block"
                    style={{
                      width: "14rem",
                      display: "block",
                      margin: ".5rem 0"
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
                <FormControl sx={{
                  display: "block",
                  width: '14rem',
                  margin: ".5rem 0"
                }} 
                variant="outlined">
                  <InputLabel 
                  htmlFor="outlined-adornment-password">Password
                  </InputLabel>
                  <OutlinedInput
                    name='cvv'
                    style = {{height: '3rem'}}
                    //onChange={handleChangePerson}
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
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  )
}
