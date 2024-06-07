import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AppBar = () => {
  const Navigate = useNavigate()
  const location = useLocation();
const handleLogout = async()=>{
  try {
    const response = await axios.post("http://localhost:3000/api/v1/user/logout",{
      withCredentials:true,
      headers:{
        authorization:localStorage.getItem("accessToken"),
        refreshToken:localStorage.getItem("refreshToken")
      }
    })
    if(response.status<301)
    {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      toast.success("Logged out Successfully")
      Navigate("/signin")
    }
  } catch (error) {
    toast.error(error.response.data.message)
    return;
  }
}
  return (
    <div className="border-b-2 flex justify-between items-center fixed top-0 w-full bg-white z-10">
      <div className="py-6 px-8">
        <Link to="/" className="font-bold">
          DAILYGROW
        </Link>
      </div>
      <div className="py-6 px-6 flex">
        {location.pathname === '/signup' ? (
          <div className="px-5">
            <Link
              to="/signin"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow"
            >
              Sign In
            </Link>
          </div>
        ) : location.pathname === '/signin' ? (
          <div className="px-5">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className=' flex justify-center items-center'>
            <div className="px-2">
              <button onClick={handleLogout} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold  px-4 border border-gray-400 rounded-md shadow">Logout</button>
            </div>
            <div className="px-5">
              <Link
                to="/todo/create"
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow"
              >
                Create
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
