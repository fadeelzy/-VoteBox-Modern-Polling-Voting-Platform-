// Remove mockPolls and currentPoll setup
// const mockPolls = [...];

// Instead, use pollData passed from Django
let currentPoll = pollData;
let selectedOption = null;
let hasVoted = false;

// Load poll data
function loadPoll() {
    if (!currentPoll) {
        window.location.href = '/dashboard/';
        return;
    }

    document.getElementById('poll-title').textContent = currentPoll.title;
    document.getElementById('poll-description').textContent = currentPoll.description;
    document.getElementById('total-votes').textContent = `${currentPoll.totalVotes} votes`;

    const statusElement = document.getElementById('poll-status');
    statusElement.textContent = currentPoll.isActive ? 'Active' : 'Closed';
    statusElement.className = `status-badge ${currentPoll.isActive ? 'status-active' : 'status-inactive'}`;

    loadPollOptions();
}
function submitVote() {
    if (!selectedOption || hasVoted || !currentPoll.isActive) return;

    // Submit form to backend
    const form = document.createElement('form');
    form.method = "POST";
    form.action = window.location.href;

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "csrfmiddlewaretoken";
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);

    const optionInput = document.createElement("input");
    optionInput.type = "hidden";
    optionInput.name = "option";
    optionInput.value = selectedOption;
    form.appendChild(optionInput);

    document.body.appendChild(form);
    form.submit();
}