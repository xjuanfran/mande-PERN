import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCallback } from "react";

export default function ServiceList() {

  var idUser = useParams();

  const [services, setServices] = useState([]);

  const loadServices = useCallback(
    async () => {
      const response = await fetch(`http://localhost:4000/service/record/${idUser.id}`);
      const data = await response.json();
      setServices(data);
    }, [idUser.id]
  )

  useEffect(() => {
    loadServices();
  }, [loadServices])

  return (
    <>
      <h1>Services List</h1>
      {
        services.map((service) => (
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: 'lightblue'
          }}>
            <CardContent>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Id del servicio: </Typography>
                <Typography>{service.service_id}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Horas:</Typography>
                <Typography> {service.hours}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Estatus de calificación: </Typography>
                <Typography>{service.status_rating}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Nombre:</Typography>
                <Typography>{service.name}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Descripción: </Typography>
                <Typography> {service.description}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Total del pago:</Typography>
                <Typography> {service.total_payment}</Typography>
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Fecha de pago: </Typography>
                <Typography> {service.pay_date}</Typography>                
              </h1>
              <h1 style={{ display: "flex" }}>
                <Typography style={{ fontWeight: "bold" }}>Estado de pago:</Typography>
                <Typography> {service.statuspay}</Typography>
              </h1>
            </CardContent>
          </Card>
        ))
      }
    </>
  )

}