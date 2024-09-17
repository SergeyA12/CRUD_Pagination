import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect} from "react";
import '../App.css';
import { IFormInput } from "../lib/Types";

export const User = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
  const path = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:3011/users/${id}`);
      const userData = response.data;
      setValue("name", userData.name);
      setValue("surname", userData.surname);
      setValue("age", userData.age);
      setValue("salary", userData.salary);
    };
    getUser();
  }, [id, setValue]);

  const onSubmit = async (data: IFormInput) => {
    try {
      await axios.put(`http://localhost:3011/users/${id}`, data);
      path("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input className="form-input" {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <input className="form-input"{...register("surname", { required: "Surname is required" })} />
        {errors.surname && <p>{errors.surname.message}</p>}
      </div>
      <div>
        <input className="form-input"{...register("age", { required: "Age is required", valueAsNumber: true })} type="number" />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <input className="form-input"{...register("salary", { required: "Salary is required", valueAsNumber: true })} type="number" />
        {errors.salary && <p>{errors.salary.message}</p>}
      </div>
      <button className="form-button-edit" type="submit">Update User</button>
    </form>
  );
};
