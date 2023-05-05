import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


const url = "/auth/register"

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const registerUser = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.post(url,{
        username,
        email,
        password
      })
      const data = await response.data;
      navigate('/login')
      console.log(data);

    }catch(e){
      console.log(e.response.data.message);
    }

  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="auto"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>

          <div className="text-center py-2 text-gray-500 underline text">
            Already a member?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
