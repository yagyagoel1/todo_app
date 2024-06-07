import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker"; // For the date picker
import axios from "axios";
import toast from "react-hot-toast";

const TodoForm = () => {
  const Navigate  =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("accessToken"))
    {
      toast.error("Please login to view your todos")
      Navigate("/signin");
      return ;
    }
  },[])
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch existing todo data if ID is provided in the URL
  useEffect(() => {
    if (id !== "create") {
     try{ axios
        .get(`http://localhost:3000/api/v1/tasks/${id}`, {
          withCredentials: true,
          headers:{
            authorization:localStorage.getItem("accessToken"),
            refreshToken:localStorage.getItem("refreshToken")
          }
        })
        .then((response) => {
          setTitle(response.data.data.title);
          setDescription(response.data.data.description);
          setDueDate(new Date(response.data.data.dueDate));
          setStatus(response.data.data.status);
        });}
        catch(error)
        {
          toast.error(error.response.data.message)
    return;
        }
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //if updating a todo
    
   try {
    let response;
     if (id !== "create") {
      response= await axios.put(
         `http://localhost:3000/api/v1/tasks/${id}`,
         {
           title,
           description,
           dueDate,
           status,
         },
         {
           withCredentials: true,
           headers:{
             authorization:localStorage.getItem("accessToken"),
             refreshToken:localStorage.getItem("refreshToken")
           }
         }
       );
     }
     //if creating a todo
     else {
       response = await axios.post(
         `http://localhost:3000/api/v1/tasks/`,
         {
           title,
           description,
           dueDate,
           status,
         },
         {
           withCredentials: true,
           headers:{
            authorization:localStorage.getItem("accessToken"),
            refreshToken:localStorage.getItem("refreshToken")
          }
         }
       );
     }
    toast.success("Todo saved successfully");
    setIsLoading(false);
    navigate("/");
   } catch (error) {
    toast.error(error.response.data.message);
    setIsLoading(false);
    return ;
   }
   
  };
  const isFormValid = () => {
    return title.length >= 1 && description.length >= 1;
  };
  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {id !== "create" ? "Update Todo" : "Create Todo"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={5}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date:
          </label>
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!isFormValid() || isLoading} // Disable button when form is invalid or loading
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } ${!isFormValid() ? "bg-gray-300 hover:bg-gray-300" : ""}`}
        >
          {isLoading ? (
            <div className="flex">Loading..</div>
          ) : id !== "create" ? (
            "Update Todo"
          ) : (
            "Create Todo"
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
