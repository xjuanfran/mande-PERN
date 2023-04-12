import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  CssBaseline,
} from "@mui/material";


export default function InputAdornments() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    description: "",
    person_id: "",
  });

  const handleChangeAddress = (e) => {
    //console.log(e.target.name, e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const idPerson = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //Contruye el objeto completo para enviar a la tabla address
    const completeAddress = {
      description: address.description,
      person_id: idPerson.id,
    };

    const dataAddress = await fetch("http://localhost:4000/address", {
      method: "POST",
      body: JSON.stringify(completeAddress),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResultAddress = await dataAddress.json();
    console.log(dataResultAddress);
    if (dataResultAddress.message === "Cannot read properties of undefined (reading 'lon')") {
      alert("No se encontro la direccion, por favor intente de nuevo");
    } else {
      if (idPerson.type === "client") {
        navigate(`/client/${idPerson.id}/new`);
      } else {
        navigate(`/employee/${idPerson.id}/new`);
      }
    }
    console.log(idPerson.type);

    setLoading(false);
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
              Por favor registra una dirección
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={!address.description}
                      sx={{ mt: 2 }}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={30} />
                      ) : (
                        "Validar"
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
