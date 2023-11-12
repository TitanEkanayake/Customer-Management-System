import { v4 as uuidv4 } from "uuid";
let admins = [
  {
    name: "titan",
    email: "titan@gmail.com",
    password: "123",
    phone: "1234",
    role: "admin",
    id: "1",
  },
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "123",
    phone: "1234",
    role: "admin",
    id: "2",
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: "123",
    phone: "1234",
    role: "staff",
    id: "3",
  },
];

export const getAdmins = (req, res) => {
  res.send(admins);
};

export const createAdmin = (req, res) => {
  const admin = req.body;

  const adminId = uuidv4();

  const userWithId = { ...admin, id: adminId };

  admins.push(userWithId);

  res.send(`User with tha name ${admin.name} has Created!`);
};

export const getAdminById = (req, res) => {
  const { id } = req.params;
  const findAdmin = admins.find((admin) => admin.id === id);

  res.send(findAdmin);
};
