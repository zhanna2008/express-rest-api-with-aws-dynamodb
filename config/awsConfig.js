import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const config = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const client = new DynamoDBClient(config);

export default client;
