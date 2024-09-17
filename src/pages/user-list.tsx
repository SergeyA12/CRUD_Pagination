import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../lib/Types";
import { Link } from "react-router-dom";
import '../App.css';

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:3011/users");
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3011/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>surname</th>
          <th>age</th>
          <th>salary</th>
          <th>detalis</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user=>(
            <tr key = {user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
              <td>{user.salary}</td>
              <td>{<Link to={`/user/${user.id}`}>Edit</Link>}</td>
              <td><button className="form-button" onClick={() => handleDelete(user.id)}>delete</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};



