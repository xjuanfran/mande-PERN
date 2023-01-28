import React from 'react'
import '../style-sheet/WorksList.css'
import { useEffect, useState } from 'react'

export default function WorksList() {

  const [picture, setPicture] = useState([]);
  const [description, setDescription] = useState([]);
  const [review, setReview] = useState([]);

  const loadEmployeePic = async () => {
    const employeeResponse = await fetch("http://localhost:4000/employee/Allwork/2");
    const employeeData = await employeeResponse.json();
    const employeePic = await employeeData.map((employeeData) => (employeeData.profile_picture));
    //console.log(employeePic);
    setPicture(employeePic);
  }

  const loadWorkDescription = async () => {
    const descriptionResponse = await fetch("http://localhost:4000/employeesWork");
    const descriptionData = await descriptionResponse.json();
    const description = await descriptionData.map((descriptionData) => (descriptionData.description));
    //console.log(description);
    setDescription(description);
  }

  const loadReview = async () => {
    const reviewResponse = await fetch("http://localhost:4000/reviews");
    const reviewData = await reviewResponse.json();
    const review = await reviewData.map((reviewData) => (reviewData.rating));
    // console.log(review);
    setReview(review);
  }


  useEffect(() => {
    loadEmployeePic();
    loadWorkDescription();
    loadReview();
  }, [])


  function Card({ picture, description, review }) {
    return (
      <div className="card-body">
        <img className=" image" src={picture} key={picture} alt="Card image cap" />
        <h5 className="card-title">{description}</h5>
        <p className="card-text">{review}</p>
        <a href="/" className="btn btn-primary">Go somewhere</a>
      </div>

    )
  }

  return (
    <div>
      <div className="album py-5 bg-light positionCard">
        <div className="card-container">
          {picture.map((picture, i) => (
            <Card key={i} picture={picture} description={description[i]} review={review[i]} />
          ))}
        </div>
      </div>
    </div>
  )
}
