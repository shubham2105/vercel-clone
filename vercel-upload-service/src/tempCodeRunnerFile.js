import { S3 } from "aws-sdk";
import fs from "fs";
require('dotenv').config();

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    accessKeyId: accessKeyId ,
    secretAccessKey: secretAccessKey ,
});
console.log("AWS_ACCESS_KEY:", process.env.AWS_ACCESS_KEY);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
