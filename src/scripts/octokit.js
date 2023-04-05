import { Octokit } from "octokit";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, 
});

async function run() {
    const {data : user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login}`);

    const { data : readme } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'huynhdoo',
        repo: 'astro-content',
        path: 'README.md',
    })

    const content = Buffer.from(readme.content, 'base64').toString()

    const updated = content + 'this line is added with octokit !'
    console.log(updated)

    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'huynhdoo',
        repo: 'astro-content',
        path: 'README.md',
        message:'Add new line with octokit',
        content: Buffer.from(updated, 'utf8').toString('base64'),
        sha: readme.sha
    });
    console.dir(response.data);
}

run()