import {
  Card,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
import React from "react";
import avatar from "../images/avatar.png";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import avatarID from "../images/avatarID.png";
import { IconButton, Stack } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //to fill combobox type of works with data from database
  const [work, setWork] = useState([]);

  const loadWork = async () => {
    const response = await fetch("http://localhost:4000/work");
    const data = await response.json();
    setWork(data);
    //console.log(data);
  };

  useEffect(() => {
    loadWork();
  }, []);

  //state for img
  const [imgEmployee, setImgEmployee] = useState(null);
  const [imgID, setImgID] = useState(null);

  //For get the id from the url
  const params = useParams();

  //state for employee
  const [employee, setEmployee] = useState({
    employee_id: params.id,
    photo_id: "",
    profile_picture: "",
  });

  //handle change for employee
  const handleChangeEmployee = (e) => {
    //console.log(e.target.name, e.target.value);
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setImgEmployee(e.target.files[0]);
  };

  //handle change for imgID
  const handleChangeImgID = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setImgID(e.target.files[0]);
  };

  const [works, setWorks] = useState({
    work_id: "",
    names: "",
  });

  const [employeeWork, setEmployeeWork] = useState({
    employee_id: params.id,
    work_id: "",
    price_hour: "",
    description: "",
  });

  const handleChangeEmployeeWork = (e) => {
    setEmployeeWork({ ...employeeWork, [e.target.name]: e.target.value });
  };

  //handle submit for employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    //onsole.log(employee, employeeWork);

    setLoading(true);

    const formData = new FormData();
    formData.append("file", imgEmployee);
    formData.append("upload_preset", "xqabu9la");
    const responseClaudinary = await fetch(
      `https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload`,
      {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      }
    );

    const dataClaudinary = await responseClaudinary.json();
    //console.log(imgEmployee);
    console.log(dataClaudinary.secure_url);

    const response = await fetch("http://localhost:4000/work");
    const dataCombo = await response.json();

    for (let i = 0; i < dataCombo.length; i++) {
      if (dataCombo[i].names === works.names) {
        employeeWork.work_id = dataCombo[i].work_id;
      }
      if (works.names === null) {
        setWorks({ ...works, work_id: "" });
      }
    }
    //console.log(employee, employeeWork);

    //Variable with the url of the image to save in the database
    let img = dataClaudinary.secure_url;

    //Build the complete object to create in the database
    const completeEmployee = {
      employee_id: params.id,
      photo_id: employee.photo_id,
      profile_picture: img,
    };

    console.log(completeEmployee);

    const employeeData = await fetch("http://localhost:4000/employee/", {
      method: "POST",
      body: JSON.stringify(completeEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const employeeDataJson = await employeeData.json();
    console.log(employeeDataJson);

    const employeeWorkData = await fetch(
      "http://localhost:4000/employeesWork",
      {
        method: "POST",
        body: JSON.stringify(employeeWork),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const employeeWorkDataJson = await employeeWorkData.json();
    console.log(employeeWorkDataJson);

    //Build the object review to create in the database
    const reviewData = {
      employee_id: employeeDataJson.employee_id,
      total_jobs: 0,
      rating: 0,
    };

    const review = await fetch("http://localhost:4000/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviewJson = await review.json();
    console.log(reviewJson);

    setLoading(false);
    navigate("/");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: #003748; }"}</style>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: -5,
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
              sx={{ display: "block", textAlign: "center" }}
            >
              Registro empleado
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
                      options={Object.values(work.map((work) => work.names))}
                      onChange={(event, newValue) => {
                        setWorks({ ...works, names: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de trabajo" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Precio por hora"
                      fullWidth
                      name="price_hour"
                      onChange={handleChangeEmployeeWork}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Descripcion trabajo"
                      fullWidth
                      multiline
                      rows={4}
                      name="description"
                      onChange={handleChangeEmployeeWork}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      pacing={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          fontSize: 15,
                          color: "gray",
                        }}
                        style={{ paddingLeft: ".2rem" }}
                      >
                        Foto de perfil
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
                          name="profile_picture"
                          onChange={handleChangeEmployee}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      pacing={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {imgEmployee ? (
                        <img
                          alt="Foto de perfil"
                          style={{
                            borderRadius: "100%",
                            width: "10.5rem",
                            height: "10rem",
                          }}
                          src={URL.createObjectURL(imgEmployee)}
                        />
                      ) : (
                        <img
                          alt="Foto perfil predeterminada"
                          style={{
                            borderRadius: "100%",
                            width: "10.5rem",
                            height: "10rem",
                          }}
                          src={avatar}
                        />
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      pacing={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          fontSize: 15,
                          color: "gray",
                        }}
                        style={{ paddingLeft: ".2rem" }}
                      >
                        Foto identificacion
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
                          name="photo_id"
                          onChange={handleChangeImgID}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      pacing={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {imgID ? (
                        <img
                          alt="Foto documento de identidad"
                          style={{ width: "10rem", height: "7rem" }}
                          src={URL.createObjectURL(imgID)}
                        />
                      ) : (
                        <img
                          alt="Foto documento predeterminada"
                          style={{ width: "10rem", height: "7rem" }}
                          src={avatarID}
                        />
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        !employeeWork.price_hour ||
                        !employeeWork.description ||
                        !imgEmployee ||
                        !imgID
                      }
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                      }}
                      style={{
                        color: "white",
                        width: "100%",
                        margin: "0 auto",
                        marginTop: "1rem",
                      }}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Registrar"
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
