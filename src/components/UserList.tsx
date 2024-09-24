import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserTypes from "../userTypes";
import UserService from "../UserService";

const UserList = () => {
  let history = useNavigate();

  const capitalizeWord = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizeEachWord = (str: string) => {
    return str
      .split(" ")
      .map((word) => capitalizeWord(word))
      .join(" ");
  };

  const handleEdit = (data: UserTypes) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("Name", data.Name);
    localStorage.setItem("Age", data.Age.toString());
    localStorage.setItem("Dob", data.Dob);
    history("/");
  };

  const handleDelete = (id: string) => {
    const users = UserService.getAllUsers();
    const updatedUsers = users.filter((u) => u.id !== id);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    UserService.deleteUser(id);

    localStorage.removeItem("id");
    localStorage.removeItem("Name");
    localStorage.removeItem("Age");
    localStorage.removeItem("Dob");

    history("/");
  };

  const users: UserTypes[] = UserService.getAllUsers();

  return (
    <>
      <div style={{ margin: "5rem" }}>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h1>
            <b>Home Page</b>
          </h1>
        </div>

        <div style={{ marginTop: "5rem" }}>
          {users.length === 0 ? (
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h4 className="emoji">
                <b>No data available</b>
              </h4>
              <h5>Click the 'Add' button to add user</h5>
            </div>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "25px" }}>Name</TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>Age</TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>
                      Date of Birth{" "}
                      <i style={{ color: "#B6B6B6" }}>(yyyy-mm-dd)</i>
                    </TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user: UserTypes) => (
                    <TableRow key={user.id}>
                      <TableCell sx={{ fontSize: "20px" }}>
                        {capitalizeEachWord(user.Name)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        {user.Age}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        {user.Dob}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        <Link to={`/edit`} style={{ textDecoration: "none" }}>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleEdit(user)}
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H9M15 5H17C18.1046 5 19 5.89543 19 7V9"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M14.902 20.3343L12.7153 20.7716L13.1526 18.585C13.1914 18.3914 13.2865 18.2136 13.4261 18.074L17.5 14L19.5 12L21.4869 13.9869L19.4869 15.9869L15.413 20.0608C15.2734 20.2004 15.0956 20.2956 14.902 20.3343Z"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </Button>
                        </Link>

                        <Button
                          color="error"
                          variant="outlined"
                          style={{ marginLeft: "1rem" }}
                          onClick={() => handleDelete(user.id)}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <br></br>
          <Link to={`/create`} style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <Button
                color="success"
                variant="contained"
                style={{
                  width: "130rem",
                  padding: "10px",
                }}
              >
                Add
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserList;
