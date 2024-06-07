import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const options = [
  { label: "pending", color: "" }, // Empty state
  { label: "inProgress", color: "purple" }, // Dash state
  { label: "completed", color: "green" }, // Tick state
];

const Todo = (props) => {
  const [currentOption, setCurrentOption] = useState(0);
  const navigate = useNavigate();
  const date = new Date(props.dueDate);
  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const year = date.getFullYear();
  const handleEdit = () => {
    navigate(`/todo/${props.id}`);
  };
  // Delete todo
  const handleDeleteTodo = async () => {
   try {
    const response =  await axios.delete(`http://localhost:3000/api/v1/tasks/${props.id}`, {
       withCredentials: true,
       headers:{
         authorization:localStorage.getItem("accessToken"),
         refreshToken:localStorage.getItem("refreshToken")
       }
     });
   } catch (error) {
    toast.error(error.response.data.message)
    return;
   }

    window.location.reload();
  };
  // Update todo status
  const handleCheckboxClick = async () => {
    setCurrentOption((prevOption) => (prevOption + 1) % options.length);
    try {
      await axios.put(
        `http://localhost:3000/api/v1/tasks/${props.id}`,
        { status: options[(currentOption + 1) % 3].label },
        { withCredentials: true,headers:{
          authorization:localStorage.getItem("accessToken"),
          refreshToken:localStorage.getItem("refreshToken")
        } }
      );
      toast.success(
        `Task status updated to ${options[(currentOption + 1) % 3].label}`
      );
    } catch (error) {
      toast.error(error.response.data.message)
    return;
    }
  };
  // Get the checkbox class
  const getCheckboxClass = (option) => {
    switch (option.color) {
      case "purple":
        return "bg-purple-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-white";
    }
  };
  // Get the checkbox content
  const getCheckboxContent = (option) => {
    switch (option.color) {
      case "purple":
        return (
          <div className="w-[18px] px-[4px]">
            <div className="w-[10px] h-[2px] bg-white"></div>
          </div>
        );
      case "green":
        return (
          <div className="w-full h-full flex items-center justify-center px-1">
            <div className="w-[10px] h-[10px] border-r-2 border-b-2 border-white transform -rotate-180 "></div>
          </div>
        );
      default:
        return <div className="w-[18px] px-[4px]"></div>;
    }
  };
  useEffect(() => {
    if (props.status === "completed") {
      setCurrentOption(2);
    } else if (props.status === "inProgress") {
      setCurrentOption(1);
    }
  }, [props.status]);

  return (
    <div className="bg-white p-6 w-11/12 rounded-3xl shadow-lg mx-8 my-4">
      <h2 className="text-xl font-bold mb-4">{props.title} </h2>
      <div className="flex items-center">
        <div
          onClick={handleCheckboxClick}
          className={`w-[24px] h-[24px] border-[2px] ${getCheckboxClass(
            options[currentOption]
          )} cursor-pointer mr-3 flex items-center justify-center`}
        >
          {getCheckboxContent(options[currentOption])}
        </div>
        <div>{props.description}</div>
      </div>

      <div className="flex mt-3">
        <div className=" px-2 rounded  text-gray-400 flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          {`${day} ${month} ${year}`}
        </div>
        <button
          onClick={handleDeleteTodo}
          className="rounded-lg ml-3 bg-red-500 text-white px-4 py-1"
        >
          Delete
        </button>
        <button
          onClick={handleEdit}
          className="rounded-lg ml-3 bg-blue-500 text-white px-6 py-1"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Todo;
