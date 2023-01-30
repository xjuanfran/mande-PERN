import React from 'react'
import '../style-sheet/WorksList.css'
import { useEffect, useState } from 'react'

export default function WorksList() {

  const [employee, setEmployee] = useState([]);

  const loadEmployee = async () => {
    const employeeResponse = await fetch("http://localhost:4000/employee/Allwork/2/50");
    const employeeData = await employeeResponse.json();
    //console.log(employeeData);
    setEmployee(employeeData);
  }

  
  useEffect(() => {
    loadEmployee();
  }, [])


  function Card({ employee }) {
    return (
      <div id='cardBodyWorkList'>
        {/* <img className="image" src={picture} key={picture} alt="Foto del perfil" />
        <h5 className="card-title">{description}</h5>
        <p className="card-text">{review}</p>
        <a href="/" className="btn btn-primary">Go somewhere</a> */}
        <h1>hola</h1>
      </div>

    )
  }

  return (
    <div>
      {/* <div className="album py-5 bg-light positionCard">
        <div className="card-container">
          {employee.map((employee, i) => (
            <Card key={i} picture={picture} description={description[i]} review={review[i]} />
          ))}
        </div>
      </div> */}
      <h1>hola</h1>
    </div>
  )
}
