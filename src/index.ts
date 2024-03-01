import express from "express";
import cors from "cors"
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./files";
import { uploadFile } from "./aws";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();


const app = express();
app.use(cors())
app.use(express.json());

//Postman
app.post("/deploy", async (req, res)=>{
    const repoUrl = req.body.repoUrl; 
    //repoUrl = github project url which is to be deployed
    const id = generate();
    // like vercel ,every repo that is to deployed need its unique id, we use generate function to generate a 5 chracter unique id
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)); 
    // SimpleGit is used to clone the link of the repo to given locally and store it to assigned folder
    const files = getAllFiles(path.join(__dirname,`output/${id}`))
    //getAllFiles is a function that returns an array of all the files that have been cloned from the repository
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length +1), file);
    })
    // clone and store each file in the repository
    publisher.lPush("build-queue", id);
    res.json({
        id: id
    })
})

app.listen(3000);