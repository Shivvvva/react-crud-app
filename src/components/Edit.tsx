import { Form, FormGroup, FormControl } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserTypes from "../userTypes";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UserService from "../UserService";

const Edit = () => {
  const showAlert = () => {
    Swal.fire({
      title: "Data edited successfully!",
      text: "Your data has been updated.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  let history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes>({
    defaultValues: {
      Name: localStorage.getItem("Name") || "",
      Age: parseInt(localStorage.getItem("Age") || "0"),
      Dob: localStorage.getItem("Dob") || "",
    },
  });

  const onSubmit: SubmitHandler<UserTypes> = (data) => {
    const users: UserTypes[] = UserService.getAllUsers();
    const updatedUsers = users.map((user) =>
      user.id === localStorage.getItem("id")
        ? {
            ...user,
            Name: data.Name,
            Age: data.Age,
            Dob: data.Dob,
          }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    UserService.updateUser({
      id: localStorage.getItem("id") ?? "",
      Name: data.Name,
      Age: data.Age,
      Dob: data.Dob,
    });

    showAlert();
    history("/");
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
      >
        <h1>
          <b>Edit your data</b>
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
              placeholder="Enter Date of Birth"
            ></FormControl>
          </FormGroup>
          {errors.Dob && (
            <div style={{ color: "#FF1111" }}>{errors.Dob.message}</div>
          )}
          <center>
            <Button
              style={{ marginTop: "3rem" }}
              variant="contained"
              onClick={handleSubmit((data: UserTypes) => onSubmit(data))}
              type="submit"
            >
              Update
            </Button>
          </center>
        </Form>
      </div>
    </>
  );
};

export default Edit;
