import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../UserContext'
import { useDispatch, useSelector } from 'react-redux'
// import { selectCurrentUser } from '../features/auth/authSlice'
import { addUser } from "../features/auth/authSlice";
import useAuth from '../hooks/useAuth'


const url = "/auth/login"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { username, email : userEmail } = useAuth();


  const dispatch = useDispatch()

  const navigate = useNavigate();

  const loginUser = async (e) =>{
    e.preventDefault()
    try{

      const response = await axios.post(url,{
        email,
        password
      })
      
      const data = await response.data;
      dispatch(addUser(data))
      // console.log(data);
      navigate('/')
      
    }catch(e){
      console.log(e.response.data.message);
    }

  }

  if (username && userEmail) {
    return (
      <Navigate to="/account" />
    )
  }


  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className="mb-64">
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={loginUser}>
                <input type="email" placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='primary'>Login</button>

                <div className="text-center py-2 text-gray-500 underline text">
                    Don't have an account yet? 
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login