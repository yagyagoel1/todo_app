import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function App() {
  axios.defaults.withCredentials = true;
  const [todos, setTodos] = useState([]);
const Navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      toast.error("Please login to view your todos")
      Navigate("/signin");
      return ;
    }
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tasks", {
          withCredentials: true,
          headers:{
            authorization:localStorage.getItem("accessToken"),
            refreshToken:localStorage.getItem("refreshToken")
          }
        });
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos(); // fetch todos on render
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-32 bg-gray-100">
      {!todos.length == 0 ? (
        todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
              dueDate={todo.dueDate}
              status={todo.status}
            />
          );
        })
      ) : (
        <div className="text-gray-400">
          No Tasks To Display, Please add todos for tracking your progress
        </div>
      )}
    </div>
  );
}

export default App;
