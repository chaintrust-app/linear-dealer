const {LinearClient} = require('@linear/sdk')
const core = require('@actions/core');
const github = require('@actions/github');

const linear = new LinearClient({
    apiKey: core.getInput('LINEAR_API_KEY')
});

async function updateIssue(issueID) {
    const workflowStates = await linear.workflowStates()
    const states = workflowStates.nodes
    // find state "Delivered"
    const newDesiredState = states.filter((state) => state.name === "Delivered")
    const issue = await linear.issue(issueID)

    console.log("------------------------------------------------")
    console.log("------------------------------------------------")
    console.log(`state: ${JSON.stringify(issue.state)}`)
    console.log(`_state: ${JSON.stringify(issue._state.id)}`)
    console.log(`newDesiredState: ${JSON.stringify(newDesiredState)}`)
    console.log(`workflowStates: ${JSON.stringify(workflowStates)}`)
    console.log(`issue: ${JSON.stringify(issue)}`)
    console.log("------------------------------------------------")
    console.log("------------------------------------------------")
}

try {
    const payload = github.context.payload
    const commitMessage = payload.head_commit.message;
    const regex = /CHA-\d{3,4}/g;
    const matchedTickets = Array.from(commitMessage.matchAll(regex), m => m[0]);

    console.log(`Commit message: ${commitMessage}`);
    console.log(`grep the CHAs: ${JSON.stringify(matchedTickets)}`);

    matchedTickets.map((ticket) => {
        updateIssue(ticket)
    })
} catch (error) {
    core.setFailed(error.message);
}
