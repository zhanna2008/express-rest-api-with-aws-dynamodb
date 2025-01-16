import client from "../config/awsConfig.js";
import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

export async function getAllItems(input) {
  try {
    const command = new ScanCommand(input);
    const response = await client.send(command);

    return response;
  } catch (e) {
    console.error("An error occurred while getting all items ", e);
    throw e;
  }
}

export async function getItem(input) {
  try {
    const command = new GetItemCommand(input);
    const response = await client.send(command);

    return response;
  } catch (e) {
    console.error("An error occurred while getting the item ", e);
    throw e;
  }
}

export async function createItem(input) {
  try {
    const command = new PutItemCommand(input);
    const response = await client.send(command);

    return response;
  } catch (e) {
    console.error("An error occurred while creating the item ", e);
    throw e;
  }
}

export async function updateItem(userUpdates) {
  const { id, ...updates } = userUpdates;

  const itemKeys = Object.keys(updates).filter(
    (key) => updates[key] !== undefined
  );

  const params = {
    TableName: "User",
    Key: { id },
    ReturnValues: "ALL_NEW",
    UpdateExpression: `SET ${itemKeys
      .map((key, index) => `#field${index} = :value${index}`)
      .join(", ")}`,
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, key, index) => ({
        ...accumulator,
        [`#field${index}`]: key,
      }),
      {}
    ),
    ExpressionAttributeValues: itemKeys.reduce(
      (accumulator, key, index) => ({
        ...accumulator,
        [`:value${index}`]: updates[key],
      }),
      {}
    ),
  };

  try {
    const command = new UpdateItemCommand(params);
    const response = await client.send(command);

    return response;
  } catch (e) {
    console.error("An error occurred while updating an item ", e);
    throw e;
  }
}

export async function deleteItem(params) {
  try {
    const command = new DeleteItemCommand(params);
    const response = await client.send(command);

    return response;
  } catch (e) {
    console.error("An error occurred while updating an item ", e);
    throw e;
  }
}
