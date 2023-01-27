import React from 'react'
import { Button } from '@mui/material'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../style-sheet/WorksList.css'
import git from '../images/git.png'
import instagram from '../images/instragramLogo.png'
import facebook from '../images/faceLogo.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    const [picture, setPicture] = useState([]);
    const [description, setDescription] = useState([]);
    const [review, setReview] = useState([]);
  
    const loadEmployeePic = async () => {
      const employeeResponse = await fetch("http://localhost:4000/employee");
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
  
    return (       
        <div>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Recent publications</h1>
                <p className="lead text-muted">Here are the postings of new workers you might be interested in</p>
                <p>
                  <a href="#" className="btn btn-primary my-2">Main call to action</a>
                  <a href="#" className="btn btn-secondary my-2">Secondary action</a>
                </p>
              </div>
            </div>
          </section>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="col">
                  <div className="card shadow-sm">
                  {picture.map((picture) => (
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" href={picture} role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                  ))}
                    <div className="card-body">
                      {description.map((description) => (
                      <p className="card-text">{description}</p>
                      ))}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Hire</button>
                        </div>
                        {review.map((review) => (
                        <small className="text-muted">{review}</small>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
)}