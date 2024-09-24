import UserTypes from "./userTypes";
import { v4 as uuid } from "uuid";

const LOCAL_STORAGE_KEY = "users";

const UserService = {
  getAllUsers: (): UserTypes[] => {
    const users = localStorage.getItem(LOCAL_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  },

  addUsers: (): UserTypes => {
    const users = UserService.getAllUsers();
    const User: UserTypes = {
      id: uuid().slice(0, 8),
      Name: "",
      Age: 0,
      Dob: "",
    };
    const updatedUser = [...users, User];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
    return User;
  },

  updateUser: (user: UserTypes) => {
    const users: UserTypes[] = UserService.getAllUsers();
    const updatedUser = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));

    return user;
  },

  deleteUser: (id: string): void => {
    const users = UserService.getAllUsers();
    const updatedUsers = users.filter((u) => u.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
  },
};

export default UserService;
