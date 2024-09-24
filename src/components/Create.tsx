import { Form, FormGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userTypes from "../userTypes";

const Create = () => {
  const showAlert = () => {
    Swal.fire({
      title: "Data added successfully!",
      text: "Your data has been added to the table.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  let history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userTypes>();

  const onSubmit: SubmitHandler<userTypes> = (data) => {
    const users: userTypes[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    users.push({
      id: uuid().slice(0, 8),
      Name: data.Name,
      Age: data.Age,
      Dob: data.Dob,
    });
    localStorage.setItem("users", JSON.stringify(users));
    showAlert();
    history("/");
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
      >
        <h1>
          <b>Add new data</b>
        </h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          marginTop: "5rem",
          marginLeft: "10rem",
          marginRight: "10rem",
        }}
      >
        <Form>
          <FormGroup
            className="mb-3"
            controlId="formName"
            style={{ marginBottom: "2rem" }}
          >
            <FormControl
              {...register("Name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Name must be within 16 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name must contain only alphabetic characters",
                },
              })}
              type="text"
              placeholder="Enter Name"
            ></FormControl>
            {errors.Name && (
              <div style={{ color: "#FF1111" }}>{errors.Name.message}</div>
            )}
          </FormGroup>

          <FormGroup
            className="mb-3"
            controlId="formAge"
            style={{ marginBottom: "2rem" }}
          >
            <FormControl
              {...register("Age", {
                required: "Age is required",
                validate: (value: number) => {
                  if (isNaN(Number(value))) {
                    return "Age must be a number";
                  }
                  const age = Number(value);
                  if (age < 1 || age > 99) {
                    return "Age must be between 1 to 99";
                  }
                  return true;
                },
              })}
              type="number"
              placeholder="Enter Age"
            ></FormControl>
            {errors.Age && (
              <div style={{ color: "#FF1111" }}>{errors.Age.message}</div>
            )}
          </FormGroup>

          <FormGroup
            className="mb-3"
            controlId="formDob"
            style={{ marginBottom: "4rem" }}
          >
            <FormControl
              {...register("Dob", {
                required: "Date of birth is required",
                validate: (value) => {
                  if (
                    new Date(value) > new Date("2024-09-11") ||
                    new Date(value) < new Date("1925-09-11")
                  ) {
                    return "Enter a valid date of birth";
                  }
                  return true;
                },
              })}
              type="date"
              min="1925-09-01"
              max="2024-09-01"
              placeholder="Enter Date of Birth"
            ></FormControl>
            {errors.Dob && (
              <div style={{ color: "#FF1111" }}>{errors.Dob.message}</div>
            )}
          </FormGroup>
          <center>
            <Button
              style={{ marginTop: "3rem" }}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </center>
        </Form>
      </div>
    </>
  );
};

export default Create;
