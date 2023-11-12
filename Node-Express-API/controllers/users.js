import { v4 as uuidv4 } from "uuid";
let users = [
  {
    name: "jhon",
    email: "jhon@gmail.com",
    phone: "1232324",
    gender: "male",
    id: "331ac72b-46e1-413c-b304-ea620b57f9ef",
  },
  {
    name: "titan",
    email: "titan@gmail.com",
    phone: "94761234567",
    gender: "male",
    id: "7a6ad256-fe95-401a-95e2-2089515af5f7",
  },
  {
    id: "2",
    name: "Alex",
    email: "alex@gmail.com",
    phone: "94761234567",
    gender: "male",
  },
  {
    id: "3",
    name: "Emily",
    email: "emily@gmail.com",
    phone: "94779876543",
    gender: "female",
  },
  {
    id: "4",
    name: "Daniel",
    email: "daniel@gmail.com",
    phone: "94786543210",
    gender: "male",
  },
  {
    id: "5",
    name: "Sophia",
    email: "sophia@gmail.com",
    phone: "94798765432",
    gender: "female",
  },
  {
    id: "6",
    name: "Mia",
    email: "mia@gmail.com",
    phone: "94712345678",
    gender: "female",
  },
  {
    id: "7",
    name: "Ethan",
    email: "ethan@gmail.com",
    phone: "94728765432",
    gender: "male",
  },
  {
    id: "8",
    name: "Ava",
    email: "ava@gmail.com",
    phone: "94731234567",
    gender: "female",
  },
];

export const getUsers = (req, res) => {
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;

  const userId = uuidv4();

  const userWithId = { ...user, id: userId };

  users.push(userWithId);

  res.send(`User with tha name ${user.name} added to the database!`);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => user.id === id);

  res.send(findUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted from the database.`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender } = req.body;
  const user = users.find((user) => user.id === id);
  if (name) user.name = name;

  if (email) user.email = email;

  if (phone) user.phone = phone;

  if (gender) user.gender = gender;

  res.send(`User with the id ${id} has been updated!.`);
};
