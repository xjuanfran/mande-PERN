import "date-fns";
import md5 from "md5";
import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { Link, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputAdornment from "@mui/material/InputAdornment";
import { Helmet, HelmetProvider } from "react-helmet-async";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Card,
  Alert,
  CssBaseline,
  Box,
  Container,
  Grid,
} from "@mui/material";

//type of card, debit or credit
const cardOptions = ["Debito", "Credito"];

export default function ClientForm() {
  const navigate = useNavigate();

  //state for img
  const [img, setImg] = useState(null);

  //Hook to manage the loading state
  const [loading, setLoading] = useState(false);

  //UseStates for error or alert message if the data in form is not valid
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  //on submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    payM.cvv = encriptarMethodP(payM.cvv);
    payM.card_number = encriptarMethodP(payM.card_number);
    //console.log(payM);

    const dataUser = await fetch("http://localhost:4000/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResultUser = await dataUser.json();
    console.log(dataResultUser);

    const dataValidation = await fetch(
      `http://localhost:4000/PayMethod/Validation/${payM.card_number}`
    );
    const dataResultValidation = await dataValidation.json();

    if (dataResultValidation.message === false) {
      const dataPayM = await fetch("http://localhost:4000/PayMethod", {
        method: "POST",
        body: JSON.stringify(payM),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResultPayM = await dataPayM.json();
      console.log(dataResultPayM);
      navigate("/");
    } else {
      setError("metodo pago existe");
      setShowAlert(true);
    }

    setLoading(false);
    e.target.reset();
  };

  const params = useParams();

  //state for user
  const [user, setUser] = useState({
    user_id: params.id,
    utility_bill: "",
  });

  //handle change for user
  const handleChangeUser = (e) => {
    //console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  };

  //state for payment method
  const [payM, setPayM] = useState({
    cvv: "",
    card_number: "",
    card_type: null,
    expiration_date: "",
    user_id: params.id,
  });

  function encriptarMethodP(datos) {
    return md5(datos);
  }

  //handle change for payment method
  const handleChangePayM = (e) => {
    //console.log(e.target.name, e.target.value);
    setPayM({ ...payM, [e.target.name]: e.target.value });
  };

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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  Iniciar sesion
                </a>
              </li>
            </ul>
          </div>
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
              Registro cliente
            </Typography>
            <Typography
              style={{
                color: "black",
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "1.2rem",
              }}
            >
              Metodo de pago
            </Typography>
            <CardContent>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      options={cardOptions}
                      onChange={(event, newValue) => {
                        setPayM({ ...payM, card_type: newValue });
                      }}
                      sx={{
                        display: "block",
                        margin: " -2rem 0rem 0",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de tarjeta" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Numero de tarjeta"
                      fullWidth
                      name="card_number"
                      onChange={handleChangePayM}
                      InputLabelProps={{ style: { color: "black" } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label
                      style={{
                        color: "black",
                      }}
                    >
                      Fecha de expiración
                    </label>
                    <input
                      type="date"
                      name="expiration_date"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "3rem",
                        padding: "0.5rem",
                        backgroundColor: "#f7f6f6",
                        border: "1px solid #003748",
                        borderRadius: "0.5rem",
                        borderColor: "#CFCFCF",
                        fontSize: "1rem",
                        boxShadow: "none",
                        cursor: "pointer",
                      }}
                      onChange={handleChangePayM}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#000";
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        if (!e.target.matches(":focus"))
                          e.target.style.borderColor = "#003748";
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = "#000000";
                        e.target.style.outline = "none";
                      }}
                      onMouseLeave={(e) => {
                        if (!e.target.matches(":focus"))
                          e.target.style.borderColor = "#DEDEDE";
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{marginTop: ".5rem"}}>
                      <InputLabel
                        style={{ color: "black", margin: "-.2rem 0" }}
                        htmlFor="outlined-adornment-password"
                      >
                        Clave de seguridad
                      </InputLabel>
                      <OutlinedInput
                        name="cvv"
                        onChange={handleChangePayM}
                        style={{ height: "3rem" }}
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
                        label="Clave de seguridad"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        color: "black",
                        paddingLeft: ".2rem",
                        fontSize: "1.1rem",
                      }}
                    >
                      Datos personales
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      pacing={0}
                      sx={{ marginTop: "-1rem" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          textAlign: "center",
                          fontSize: 15,
                        }}
                        style={{ paddingLeft: ".2rem" }}
                      >
                        Factura de servicios
                      </Typography>
                      <IconButton
                        color="inherit"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          name="utility_bill"
                          onChange={handleChangeUser}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {img ? (
                      <img
                        alt="Preview"
                        style={{ maxWidth: "100%" }}
                        src={URL.createObjectURL(img)}
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="info"
                      type="submit"
                      disabled={
                        !payM.card_type ||
                        !payM.card_number ||
                        !payM.expiration_date ||
                        !payM.cvv ||
                        !user.utility_bill ||
                        payM.cvv.length < 4 ||
                        payM.cvv.length > 4
                      }
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                      }}
                      style={{
                        color: "white",
                        width: "80%",
                        margin: "0 auto",
                        marginTop: "1rem",
                      }}
                    >
                      {loading ? (
                        <CircularProgress color="info" size={20} />
                      ) : (
                        "Registrarse"
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {showAlert && (
                      <div>
                        {error === "metodo pago existe" && (
                          <Alert
                            severity="error"
                            sx={{ mt: 2, textAlign: "center" }}
                          >
                            El metodo de pago ya existe
                          </Alert>
                        )}
                      </div>
                    )}
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
