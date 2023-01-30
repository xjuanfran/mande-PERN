import React from 'react'
import '../style-sheet/WorksList.css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function WorksList() {

  const [picture, setPicture] = useState([]);
  const [nameEmployee, setNameEmployee] = useState([]);
  const [description, setDescription] = useState([]);
  const [distance, setDistance] = useState([]);
  const [review, setReview] = useState([]);

  var idWork = useParams();
  //console.log(idWork.idWork);

  var idUser = useParams();
  //console.log(idUser.idPerson);

  const loadEmployeePic = async () => {

    const employeeResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    console.log(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`)
    const employeeData = await employeeResponse.json();
    const employeePic = await employeeData.map((employeeData) => (employeeData.profile_picture));
    console.log(employeePic);
    setPicture(employeePic);
  }

  const loadEmployeeName = async () => {
    const nameResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    const nameData = await nameResponse.json();
    const name = await nameData.map((nameData) => (nameData.first_name + " " + nameData.last_name));
    console.log(name);
    setNameEmployee(name);
  }

  const loadWorkDescription = async () => {
    const descriptionResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    const descriptionData = await descriptionResponse.json();
    const description = await descriptionData.map((descriptionData) => (descriptionData.description));
    console.log(description);
    setDescription(description);
  }

  const loadDistance = async () => {
    const distanceResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    const distanceData = await distanceResponse.json();
    const distance = await distanceData.map((distanceData) => (distanceData.distance));
    console.log(distance);
    setDistance(distance);
  }

  const loadReview = async () => {
    const reviewResponse = await fetch(`http://localhost:4000/employee/Allwork/${idWork.idWork}/${idUser.idPerson}`);
    const reviewData = await reviewResponse.json();
    const review = await reviewData.map((reviewData) => (reviewData.scored));
    console.log(review);
    setReview(review);
  }


  useEffect(() => {
    loadEmployeePic();
    loadEmployeeName();
    loadWorkDescription();
    loadDistance();
    loadReview();
  }, [])


  function Card({ picture, nameEmployee, description, distance, review }) {
    return (
      <div id='cardBodyWorkList'>
        <img className="image" src={picture} key={picture} alt="Foto del perfil" />
        <h5 className="card-title">{nameEmployee}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{distance} Metros de distancia</p>
        <p className="card-text">{review} de calificacion</p>
        <a href="/" className="btn btn-primary">Go somewhere</a>
      </div>

    )
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Mande</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Iniciar sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="album py-5 bg-light positionCard">
        <div className="card-container">
          {description.map((description, i) => (
            <Card key={i} picture={picture[i]} nameEmployee={nameEmployee[i]} description={description} distance={distance[i]} review={review[i]} />
          ))}
        </div>
      </div>
    </div>
  )
}
