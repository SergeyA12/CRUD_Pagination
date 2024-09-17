import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';
import {IFormInput} from "../lib/Types.ts"



export const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const path = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    try {
      await axios.post("http://localhost:3011/users", data);
      path("/")
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Name" className="form-input" {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div>
        <input placeholder="Surname" className="form-input" {...register("surname", { required: "Surname is required" })} />
        {errors.surname && <p className="error-message">{errors.surname.message}</p>}
      </div>
      <div>
        <input placeholder="Age" className="form-input" {...register("age", { required: "Age is required", valueAsNumber: true })} type="number" />
        {errors.age && <p className="error-message">{errors.age.message}</p>}
      </div>
      <div>
        <input placeholder="Salary" className="form-input" {...register("salary", { required: "Salary is required", valueAsNumber: true })} type="number" />
        {errors.salary && <p className="error-message">{errors.salary.message}</p>}
      </div>
      <button className="form-button" type="submit">Add User</button>
    </form>
  );
};
