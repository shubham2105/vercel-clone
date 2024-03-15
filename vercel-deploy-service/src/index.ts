import {commandOptions, createClient} from "redis";
import { downloadS3Folder } from "./aws";
const subscriber = createClient();
subscriber.connect();

 async function main(){
    while(1){
        const res = await subscriber.brPop(
            commandOptions({isolated: true}),
            'build-queue',
            0
        );
        // @ts-ignore
        const id = res.element.trim();
        
        const downloadPath = `output/${id}`;

        await downloadS3Folder(`output/${id}`);
        console.log("Downloaded files to" + downloadPath);
    }
}
main();