import { Card, Grid, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material'
import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import avatar from '../images/avatar.png'
import avatarID from '../images/avatarID.png'
import { Autocomplete } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom';


export default function EmployeeForm() {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  //to fill combobox type of works with data from database
  const [work, setWork] = useState([]);

  const loadWork = async () => {
    const response = await fetch('http://localhost:4000/work');
    const data = await response.json();
    setWork(data);
    //console.log(data);
  }

  useEffect(() => {
    loadWork();
  }, [])

  //state for img
  const [img, setImg] = useState(null);
  const [imgID, setImgID] = useState(null);

  const params = useParams();

  //state for employee
  const [employee, setEmployee] = useState({
    employee_id: params.id,
    photo_id: '',
    profile_picture: ''
  })

  //handle change for employee
  const handleChangeEmployee = (e) => {
    //console.log(e.target.name, e.target.value);
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImg(e.target.files[0])
  }

  //handle change for imgID
  const handleChangeImgID = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImgID(e.target.files[0])
  }

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [works, setWorks] = useState({
    work_id: '',
    names: ''
  })

  const [employeeWork, setEmployeeWork] = useState({
    employee_id: params.id,
    work_id: '',
    price_hour: '',
    description: ''
  })

  const handleChangeEmployeeWork = (e) => {
    setEmployeeWork({ ...employeeWork, [e.target.name]: e.target.value })
  }

  //handle submit for employee
  const handleSubmit = async (e) => {

    e.preventDefault();

    //onsole.log(employee, employeeWork);

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "xqabu9la");
    const responseClaudinary = await fetch(
      "https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload",
      {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      }
    );

    const dataClaudinary = await responseClaudinary.json();
    console.log(dataClaudinary.secure_url);

    const response = await fetch('http://localhost:4000/work');
    const dataCombo = await response.json();
    //let workId = data.map((work) => work.work_id);
    //console.log(workId);
    ///console.log(works.names)

    for (let i = 0; i < dataCombo.length; i++) {
      if (dataCombo[i].names === works.names) {
        employeeWork.work_id = dataCombo[i].work_id;
      }
      if (works.names === null) {
        setWorks({ ...works, work_id: '' })
      }
    }
    //console.log(employee, employeeWork);

     //Contruye el objeto completo para enviar a la tabla employee

     let img = dataClaudinary.secure_url;

     const completeEmployee = {
      employee_id: params.id,
      photo_id: employee.photo_id,
      profile_picture: img

   }

   console.log(completeEmployee)

    const employeeData = await fetch('http://localhost:4000/employee/', {
      method: 'POST',
      body: JSON.stringify(completeEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const employeeDataJson = await employeeData.json();
    console.log(employeeDataJson);

    const employeeWorkData = await fetch('http://localhost:4000/employeesWork', {
      method: 'POST',
      body: JSON.stringify(employeeWork),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const employeeWorkDataJson = await employeeWorkData.json();
    console.log(employeeWorkDataJson);

    //construye el objeto review para crearlo en la base de datos

    const reviewData = {
      employee_id: employeeDataJson.employee_id,
      total_jobs : 0,
      rating: 0
    }

    const review = await fetch('http://localhost:4000/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const reviewJson = await review.json();
    console.log(reviewJson);

    setLoading(false);
    navigate('/');
  }

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5, borderRadius: ".5rem" }}
            style={{
              backgroundColor: "#f7f6f6",
              padding: ".5rem"
            }}
          >
            <Typography
              variant='h5'
              sx={{ display: "block", textAlign: "center" }}
            >
              Registro empleado
            </Typography>
            <form onSubmit={handleSubmit}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Autocomplete
                  disablePortal
                  options={Object.values(work.map((work) => work.names))}
                  onChange={(event, newValue) => { setWorks({ ...works, names: newValue }) }}
                  sx={{
                    display: "block",
                    margin: " 0rem 0",
                  }}
                  style={{ width: "80%" }}
                  renderInput={(params) => <TextField {...params} label="Tipo de trabajo" />}
                />
              </CardContent>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <TextField
                  variant="outlined"
                  label="Precio por hora"
                  sx={{
                    display: "block",
                    margin: "-.8rem 0",
                  }}
                  style={{ width: "80%" }}
                  name="price_hour"
                  onChange={handleChangeEmployeeWork}
                />
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <TextField
                    variant="outlined"
                    label="Descripcion trabajo"
                    multiline
                    rows={4}
                    sx={{
                      display: "block",
                      margin: ".9rem 0",
                    }}
                    style={{ width: "93%" }}
                    name="description"
                    onChange={handleChangeEmployeeWork}

                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography
                      sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                      style={{ paddingLeft: "2rem" }}
                    >
                      Foto de perfil
                    </Typography>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture" component="label"
                    >
                      <input
                        hidden accept="image/*"
                        type="file"
                        name='profile_picture'
                        onChange={handleChange}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                  <div
                    style={{ paddingLeft: ".8rem" }}
                  >
                    {img ?
                      <img
                        alt="Foto de perfil"
                        style={{ borderRadius: "100%", width: "9.5rem", height: "9rem" }}
                        src={url}
                      /> :
                      <img
                        alt="Foto perfil predeterminada"
                        style={{ borderRadius: "100%", width: "9.5rem", height: "9rem" }}
                        src={avatar}
                      />
                    }
                  </div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography
                      sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                      style={{ paddingLeft: ".7rem" }} >
                      Foto identificacion
                    </Typography>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture" component="label"
                    >
                      <input
                        hidden accept="image/*"
                        type="file"
                        name='photo_id'
                        onChange={handleChangeImgID}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                  <div
                    style={{ paddingLeft: ".5rem" }}
                  >
                    {imgID ?
                      <img
                        alt="Foto documento de identidad"
                        style={{ width: "10rem", height: "7rem" }}
                        src={url}
                      /> :
                      <img
                        alt="Foto documento predeterminada"
                        style={{ width: "10rem", height: "7rem" }}
                        src={avatarID}
                      />
                    }
                  </div>
                </CardContent>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={
                    !employeeWork.price_hour || !employeeWork.description
                  }
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  style={{
                    color: "white",
                    width: "70%",
                    margin: "0 auto",
                    marginTop: "1rem"
                  }}
                >
                  {loading ? <CircularProgress color="inherit" /> : "Registrar"}
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>

  )
}
