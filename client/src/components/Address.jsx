import md5 from "md5";
import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {Card, CardContent, TextField, Typography, Button, CircularProgress, Box, CssBaseline} from "@mui/material";

const kindUser = [{ label: "Cliente" }, { label: "Empleado" }];

export default function InputAdornments() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [kindPerson, setKindPerson] = useState({
    type_user: "",
  });

  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChangePerson = (e) => {
    //console.log(e.target.name, e.target.value);
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const [address, setAddress] = useState({
    description: "",
    person_id: "",
  });

  const handleChangeAddress = (e) => {
    //console.log(e.target.name, e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  function encriptarPassword(password) {
    return md5(password);
  }

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if(!isEmailValid(person.email)){
      alert("La dirección de correo electronico no es valida, por favor revise que su entrada se vea de la siguiente manera: user@example.com");
      setLoading(false);
      return;
    }
    if (person.password.length < 8) {
      alert("La contraseña debe tener almenos 8 digitos");
      setLoading(false);
      return;
    } else {
      person.password = encriptarPassword(person.password);
    }

    let continuePage = false;
    let id = 0;

    //Valida si el correo o el telefono ya existen donde en caso de que exista devuelve True y en caso de que no exista devuelve False
    const dataValidation = await fetch(
      "http://localhost:4000/person/validation",
      {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataResultValidation = await dataValidation.json();

    if (person.phone.length < 10 || person.phone.length > 10) {
      alert("El telefono debe tener 10 digitos");
      continuePage = false;
      setLoading(false);
      return;
    }

    //Crea en base de los datos la persona y la direccion si la validacion es false
    if (dataResultValidation.message === false) {
      continuePage = true;
      const data = await fetch("http://localhost:4000/person", {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResult = await data.json();
      console.log(dataResult);
      id = dataResult.person_id;

      //Contruye el objeto completo para enviar a la tabla address
      const completeAddress = {
        description: address.description,
        person_id: dataResult.person_id,
      };
      //Envia el objeto completo a la tabla address
      const dataAddress = await fetch("http://localhost:4000/address", {
        method: "POST",
        body: JSON.stringify(completeAddress),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResultAddress = await dataAddress.json();
      console.log(dataResultAddress);
    } else {
      continuePage = false;
    }

    setLoading(false);

    if (continuePage === true) {
      if (kindPerson.type_user.label === "Cliente") {
        navigate(`/client/${id}/new`);
      } else if (kindPerson.type_user.label === "Empleado") {
        navigate(`/employee/${id}/new`);
      }
    } else {
      alert("El correo o el telefono ya existen");
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: #003748; }"}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Mande
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{ mt: 10, borderRadius: ".5rem" }}
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
              Registrate
            </Typography>
            <CardContent>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Nombre completo"
                      fullWidth
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                      }}
                      name="first_name"
                      onChange={handleChangePerson}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Apellidos"
                      fullWidth
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                      }}
                      name="last_name"
                      onChange={handleChangePerson}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Correo electronico"
                      fullWidth
                      name="email"
                      onChange={handleChangePerson}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Telefono/celular"
                      fullWidth
                      name="phone"
                      type="number"
                      onChange={handleChangePerson}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Direccion"
                      fullWidth
                      name="description"
                      onChange={handleChangeAddress}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      options={kindUser}
                      onChange={(event, newValue) => {
                        setKindPerson({ ...kindPerson, type_user: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Seleccione un tipo" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        name="password"
                        onChange={handleChangePerson}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={
                        !person.first_name ||
                        !person.last_name ||
                        !person.email ||
                        !person.phone ||
                        !person.password ||
                        !kindPerson.type_user ||
                        !address.description
                      }
                      sx={{ mt: 2 }}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={30} />
                      ) : (
                        "Registrarse"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </HelmetProvider>
  );
}
