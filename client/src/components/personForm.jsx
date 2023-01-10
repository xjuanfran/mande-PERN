import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async'


export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            sx={{ mt: 5 }}
          >
            <Typography>
              Registrate
            </Typography>
            <CardContent>
              <form>
                <TextField
                  variant='outlined'
                  label='Nombre completo'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <TextField
                  variant='outlined'
                  label='Apellidos'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <TextField
                  variant='outlined'
                  label='Telefono/celular'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <TextField
                  variant='outlined'
                  label='Correo electronico'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <TextField
                  variant='outlined'
                  label='Latitud'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <TextField
                  variant='outlined'
                  label='Longitud'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                />
                <FormControl sx={{ width: '26ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
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
  );
}