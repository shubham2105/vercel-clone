import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    accessKeyId: "AKIAV4MFVZMCKSZVHIGP" ,
    secretAccessKey: "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" ,
});

export const uploadFile = async (fileName: string, localFilePath: string)=>{
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket:'100x-vercel',
        Key: fileName,
    }).promise();
    console.log(response);
    console.log("Variables from env file", accessKeyId,"and",secretAccessKey)
    
}