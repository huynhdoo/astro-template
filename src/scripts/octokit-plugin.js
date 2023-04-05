import { Octokit } from "octokit";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";

const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({
    userAgent: 'Do Huynh octokit'
});

const octokit = new MyOctokit({
//    auth: process.env.GITHUB_TOKEN,
    authStrategy: createOAuthDeviceAuth,
    auth: {
        clientType: "oauth-app",
        clientId: "19eac4cdff2f3b8de440",
        scopes:["public_repo"],
        onVerification(verification) {
            console.log("Open %s", verification.verification_uri);
            console.log("Enter code: %s", verification.user_code);
        }    
    }
})

async function run() {
    try {
        const error = new Error('Error!');
        error.status = 401 

        throw error;
        
        const response = await octokit.createOrUpdateTextFile({
            owner:'huynhdoo',
            repo: 'astro-content',
            path: 'README.md',
            message: "Update with octokit plugin",
            content: ({content}) => {return content + 'added with octokit plugin!'}
        })
    
        console.log("File correctly updated")    
    } catch (error) {
        if (error.status !== 401) {
            throw error;
        }    
        const { data: issue } = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: 'huynhdoo',
            repo: 'astro-content',
            title:'Error handling',
            body:'Sorry, there was an error...',

        }).catch((err) => {
            console.log(err);
        });

        console.log(`issue created at ${issue.html_url}`);
    }
}

run()
