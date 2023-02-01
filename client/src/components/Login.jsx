import React from 'react'
import '../style-sheet/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import md5 from 'md5'

export default function Login() {

  const navigate = useNavigate();

  //Hook to manage the loading state
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  
  function encriptarPassword(password){
    return md5(password);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    user.password = encriptarPassword(user.password);
    setLoading(true);

    const dataUser = await fetch('http://localhost:4000/person/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await dataUser.json();
    console.log(data);

    setLoading(false);

    if (data.message === "Person not found") {
      alert("Usuario no encontrado");
    } else {
      navigate(`/${data}`);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Mande</Link>
        </div>
      </nav>
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
                <button type="submit" className="btn btn-primary btn-block">
                  {loading ? <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> : 'Iniciar sesion'}
                </button>
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
