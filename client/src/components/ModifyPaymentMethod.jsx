import * as React from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";


export default function InputAdornments() {
  // const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    //   //console.log(person);

    //   let id = 0;

    //   //const dataResultValidation = await dataValidation.json();
    //   //Crea en base de los datos la persona y la direccion si la validacion es false

    //   //Contruye el objeto completo para enviar a la tabla address
    //   const completePayMethod = {
    //     cvv: dataResult.cvv,
    //     card_number: dataResult.card_number,
    //     card_type: dataResult.card_type,
    //     expiration_date: dataResult.expiration_date,
    //     user_id: dataResult.user_id,
    //   };
    //   //Envia el objeto completo a la tabla address
    //   const dataPayMethod = await fetch("http://localhost:4000/PayMethod/:id", {
    //     method: "PUT",
    //     body: JSON.stringify(completePayMethod),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const dataResultPayMethod = await dataPayMethod.json();
    //   console.log(dataResultPayMethod);

    //   const dataUserPayMethod = await fetch("http://localhost:4000/PayMethod/Person/:id", {
    //     method: "GET",
    //     body: JSON.stringify(completePayMethod),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const dataResultUserPayMethod = await dataUserPayMethod.json();
    //   console.log(dataResultPayMethod);
    // };

    // const [card, setCard] = useState({
    //   cvv: "",
    //   card_number: "",
    //   card_type: "",
    //   expiration_date: "",
    //   user_id: "",
    // });

    // const handleChangesCard = (e) => {
    //   //console.log(e.target.name, e.target.value);
    //   setCard({ ...card, [e.target.name]: e.target.value });
  };

  const idPerson = useParams();
  console.log(idPerson.id);



  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: #003748; }"}</style>
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={{ pathname: `/${idPerson.id}` }}>Mande</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/person/new">Iniciar sesion</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/">Action</a></li>
                  <li><Link className="dropdown-item" to={{ pathname: `/setPayMethod/${idPerson.id}` }}>Modificar método de pago</Link></li>
                  <li><a className="dropdown-item" href="/">Cerrar sesion</a></li>
                </ul>
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
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  label="CVV"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="cvv"
                  //onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: "black" } }}
                />
                <TextField
                  variant="outlined"
                  label="Número de tarjeta"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="card_number"
                  //onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: "black" } }}
                />
                <TextField
                  variant="outlined"
                  label="Tipo de tarjeta"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="card_type"
                  //onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: "black" } }}
                />
                <TextField
                  variant="outlined"
                  label="Fecha de expiración"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="expiration_date"
                  //onChange={handleChangesCard}
                  InputLabelProps={{ style: { color: "black" } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  style={{
                    backgroundColor: "#0a0a23",
                    color: "white",
                    width: "50%",
                    margin: "0 auto",
                    marginTop: "1rem",
                  }}
                >
                  Modificar
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}
