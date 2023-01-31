import React, { useCallback } from 'react'
import '../style-sheet/WorksList.css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function WorksList() {

  const [picture, setPicture] = useState([]);
  const [nameEmployee, setNameEmployee] = useState([]);
  const [description, setDescription] = useState([]);
  const [distance, setDistance] = useState([]);
  const [review, setReview] = useState([]);

  var idWork = useParams();
  //console.log(idWork.idWork);

  var idUser = useParams();
  console.log(idUser.idPerson);

  const loadEmployeePic = useCallback(async () => {

    const employeeResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    console.log(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`)
    const employeeData = await employeeResponse.json();
    const employeePic = await employeeData.map((employeeData) => (employeeData.profile_picture));
    console.log(employeePic);
    setPicture(employeePic);
  }, [ idWork.idWork, idUser.idPerson ]
  )

  const loadEmployeeName = useCallback(
    async () => {
      const nameResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
      const nameData = await nameResponse.json();
      const name = await nameData.map((nameData) => (nameData.first_name + " " + nameData.last_name));
      console.log(name);
      setNameEmployee(name);
    }, [ idWork.idWork, idUser.idPerson ]
  ) 

  const loadWorkDescription = useCallback(
    async () => {
      const descriptionResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
      const descriptionData = await descriptionResponse.json();
      const description = await descriptionData.map((descriptionData) => (descriptionData.description));
      console.log(description);
      setDescription(description);
    }, [ idWork.idWork, idUser.idPerson ]
  ) 

  const loadDistance = useCallback(
    async () => {
      const distanceResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
      const distanceData = await distanceResponse.json();
      const distance = await distanceData.map((distanceData) => (distanceData.distance));
      console.log(distance);
      setDistance(distance);
    }, [ idWork.idWork, idUser.idPerson ]
  ) 

  const loadReview = useCallback(
    async () => {
      const reviewResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
      const reviewData = await reviewResponse.json();
      const review = await reviewData.map((reviewData) => (reviewData.scored));
      console.log(review);
      setReview(review);
    }, [ idWork.idWork, idUser.idPerson ]
  ) 

  useEffect(() => {
    loadEmployeePic();
    loadEmployeeName();
    loadWorkDescription();
    loadDistance();
    loadReview();
  }, [loadEmployeePic, loadEmployeeName, loadWorkDescription, loadDistance, loadReview])

  function Card({ picture, nameEmployee, description, distance, review }) {
    return (
      <div id='cardBodyWorkList'>
        <img className="image" src={picture} key={picture} alt="Foto del perfil" />
        <h5 className="card-title">{nameEmployee}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{distance} Metros de distancia</p>
        <p className="card-text">{review} de calificacion</p>
        <Link to={{ pathname: `/setPayMethod/${idUser.idPerson}` }} className="btn btn-primary btnContratar">Contratar</Link>
      </div>

    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={{ pathname: `/${idUser.idPerson}` }}>Mande</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/">Action</a></li>
                    <li><Link className="dropdown-item" to={{ pathname: `/setPayMethod/${idUser.idPerson}` }}>Modificar método de pago</Link></li>
                    <li><a className="dropdown-item" href="/">Cerrar sesion</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="album py-5 bg-#003748 positionCard">
          <div className="card-container text-dark">
            {description.map((description, i) => (
              <Card key={i} picture={picture[i]} nameEmployee={nameEmployee[i]} description={description} distance={distance[i]} review={review[i]} />
            ))}
          </div>
        </div>
      </div>
    </HelmetProvider>

  )
}
