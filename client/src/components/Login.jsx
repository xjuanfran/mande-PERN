import React from 'react'
import '../style-sheet/Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="main">
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center">Inicia sesion en Mande</h3>
            <div className="card-text">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" >
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    name="password"
                    onChange={handleChange}
                  >
                    Constraseña
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm" id="exampleInputPassword1"
                    name="password" 
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                <div className="sign-up">
                  ¿Nuevo en Mande? Crea una cuenta en <Link to="/person/new">Mande</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

