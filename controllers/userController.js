import {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
} from "../db/dynamoDBClient.js";
import {
  userSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
  getUserValidationSchema,
} from "../schema/userSchema.js";

export async function getAllUsers(req, res) {
  const input = {
    TableName: "User",
  };

  try {
    const result = await getAllItems(input);

    res.status(201).json({ message: "Users fetched", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
}

export async function getUser(req, res) {
  const { error } = getUserValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.body;

  const input = {
    TableName: "User",
    Key: { id: { S: id } },
  };

  try {
    const result = await getItem(input);

    res.status(201).json({ message: "User fetched", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
}

export async function createUser(req, res) {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id, age, firstName, lastName, phoneNumber } = req.body;

  const input = {
    Item: {
      id: { S: id },
      age: { N: `${age}` },
      first_name: { S: firstName },
      last_name: { S: lastName },
      phone_number: { S: phoneNumber },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "User",
  };

  try {
    const result = await createItem(input);

    res.status(201).json({ message: "User created", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
}

export async function updateUser(req, res) {
  const { error } = updateUserValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userUpdates = { id: req.params.id, ...req.body };
  try {
    const result = await updateItem(userUpdates);

    res.status(201).json({ message: "User updated", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
}

export async function deleteUser(req, res) {
  const { error } = deleteUserValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.body;

  const input = {
    TableName: "User",
    Key: { id: { S: id } },
  };

  try {
    const result = await deleteItem(input);

    res.status(201).json({ message: "User deleted", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
}
