const { LinearClient } = require('@linear/sdk')
/*const linear = new LinearClient({
    apiKey: "lin_api_2IczXFvoXNVm9LeXPNyo7DcQOtOaZ7eusoQuT2OO"
});*/
const core = require('@actions/core');
const github = require('@actions/github');

async function getMyIssues() {
    /*const issues = await linear.issues()
    console.log(issues.issueSearch("CHA-921"))*/
    console.log(process.env.LINEAR_API_KEY)
    console.log(process.env)
}

try {
    getMyIssues()
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //const time = (new Date()).toTimeString();
    //core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
