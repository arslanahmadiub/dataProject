import axios from "axios";
import { apiEndPoint } from "../config.json";

let loginUserUrl = apiEndPoint + "loginUser";
let createUserUrl = apiEndPoint + "createUser";
let getAllUserUrl = apiEndPoint + "getAllUsers";
let deleteUserUrl = apiEndPoint + "deleteUser";
let updateUserUrl = apiEndPoint + "updateUser";

export async function login(data) {
  return await axios({
    method: "post",
    url: loginUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function createUser(data) {
  return await axios({
    method: "post",
    url: createUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getAllUser() {
  return await axios({
    method: "post",
    url: getAllUserUrl,
  });
}

export async function deleteUser(data) {
  return await axios({
    method: "post",
    url: deleteUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function updateUser(data) {
  return await axios({
    method: "post",
    url: updateUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
