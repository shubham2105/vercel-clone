import {S3} from 'aws-sdk'
import {dir} from "console";
import fs from 'fs';
import path from 'path';

const s3 = new S3({
    accessKeyId: "AKIAV4MFVZMCKSZVHIGP" ,
    secretAccessKey: "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" ,
});
export async function downloadS3Folder(prefix: string){
    console.log(prefix);
    const allFiles = await s3.listObjectsV2({
        Bucket: "100x-vercel",
        Prefix: prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async ({Key})=>{
        return new Promise(async (resolve)=>{
            if (!Key){
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, Key.trim());
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);

            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName), {recursive: true};
            }
            s3.getObject({
                Bucket: "100x-vercel",
                Key
            }).createReadStream().pipe(outputFile)
            .on("finish", ()=>{
                resolve("");
            })
        })
    }) || []
    console.log("awaiting");

    await Promise.all(allPromises?.filter(x => x !== undefined));
}
