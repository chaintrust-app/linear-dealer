const {LinearClient} = require('@linear/sdk')
const core = require('@actions/core');
const github = require('@actions/github');

const linear = new LinearClient({
    apiKey: core.getInput('LINEAR_API_KEY')
});

async function updateIssue(issueID) {
    // get all states
    const workflowStates = await linear.workflowStates()
    const states = workflowStates.nodes
    // find state "Delivered"
    const newDesiredState = states.filter((state) => state.name === "Delivered")[0]
    // find the issue to update
    const issue = await linear.issue(issueID)
    // update to the new state
    const updateStatus = await linear.issueUpdate(issue.id, {stateId: newDesiredState.id})


    console.log(`Update : ${JSON.stringify(updateStatus)}`)
    console.log("------------------------------------------------")
}

try {
    const payload = github.context.payload
    const commitMessage = payload.head_commit.message;
    const regex = /CHA-\d{3,4}/g;
    const matchedTickets = Array.from(commitMessage.matchAll(regex), m => m[0]);

    console.log("------------------------------------------------")
    console.log(`Commit message: ${commitMessage}`);
    console.log(`grep the CHAs: ${JSON.stringify(matchedTickets)}`);
    console.log("------------------------------------------------")

    matchedTickets.map((ticket) => {
        updateIssue(ticket)
    })
} catch (error) {
    core.setFailed(error.message);
}
