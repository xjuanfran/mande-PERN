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
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate} from 'react-router-dom';

const kindUser = [
  { label: 'Cliente' },
  { label: 'Empleado' }
];


export default function InputAdornments() {

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(person);  

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
      const data = await fetch('http://localhost:4000/setpaymentmethod', {
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
      const completePayMethod = {
        cvv: dataResult.cvv,
        card_number: dataResult.card_number,
        card_type: dataResult.card_type,
        expiration_date: dataResult.expiration_date,
        user_id: dataResult.user_id,
      }
      //Envia el objeto completo a la tabla address
      const dataPayMethod = await fetch('http://localhost:4000/PayMethod', {
        method: 'POST',
        body: JSON.stringify(completePayMethod),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataResultPayMethod = await dataPayMethod.json();
      console.log(dataResultPayMethod);
    } else {
      console.log('El correo ya existe o el telefono ya existe');
    }


  }

  const [card, setCard] = useState({
    cvv: '',
    card_number: '',
    card_type: '',
    expiration_date: '',
    user_id: ''
  })

  const handleChangesCard = (e) => {
    //console.log(e.target.name, e.target.value);
    setCard({ ...card, [e.target.name]: e.target.value })
  }

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
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
                marginBottom: "-2.7rem"
              }}
            >
              Registrate
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  label='CVV'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='cvv'
                  onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Número de tarjeta'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='card_number'
                  onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Tipo de tarjeta'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='card_type'
                  onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
                <TextField
                  variant='outlined'
                  label='Fecha de expiración'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  name='expiration_date'
                  onChange={handleChangesCard}
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
                  renderInput={(params) => <TextField {...params} label="Identificación del usuario" />}
                />
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
                    width: "50%",
                    margin: "0 auto",
                    marginTop: "1rem"
                  }}
                >
                  Pagar
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}