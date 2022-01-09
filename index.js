const {LinearClient} = require('@linear/sdk')
const core = require('@actions/core');
const github = require('@actions/github');

const linear = new LinearClient({
    apiKey: core.getInput('LINEAR_API_KEY')
});

async function getMyIssues() {
    const issue921 = await linear.issueSearch("CHA-921")
    console.log("------------------------------------------------")
    console.log("------------------------------------------------")
    console.log("issue CHA-921", issue921)
    console.log("------------------------------------------------")
    console.log("------------------------------------------------")
}

try {
    console.log("input LINEAR API KEY", core.getInput('LINEAR_API_KEY'))
    getMyIssues()
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
