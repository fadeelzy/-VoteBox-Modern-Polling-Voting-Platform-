// Results Page JavaScript 
document.addEventListener('DOMContentLoaded', function () {
    if (!pollData) return;

    // Poll Info
    document.getElementById('poll-title').textContent = pollData.title;
    document.getElementById('poll-description').textContent = pollData.description;
    document.getElementById('total-votes').textContent = `${pollData.totalVotes} total votes`;
    document.getElementById('poll-date').textContent = pollData.created_at;

    const statusElement = document.getElementById('poll-status');
    statusElement.textContent = pollData.isActive ? 'Active' : 'Closed';
    statusElement.className = `status-badge ${pollData.isActive ? 'status-active' : 'status-inactive'}`;

    // Detailed Results
    const detailedResults = document.getElementById('detailed-results');
    detailedResults.innerHTML = pollData.options.map(opt => {
        const percentage = pollData.totalVotes > 0 
            ? Math.round((opt.votes / pollData.totalVotes) * 100) 
            : 0;
        return `
            <div style="margin-bottom: 1rem;">
                <div class="flex justify-between" style="font-size: 0.875rem; margin-bottom: 0.5rem;">
                    <span class="font-medium">${opt.text}</span>
                    <span style="color: var(--muted-foreground);">
                        ${opt.votes} votes (${percentage}%)
                    </span>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // Charts
    const labels = pollData.options.map(opt => opt.text);
    const votes = pollData.options.map(opt => opt.votes);

    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: votes,
                backgroundColor: ['#4741a6','#9bbbfc','#f9ce69','#d9eff7']
            }]
        }
    });

    new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: votes,
                backgroundColor: ['#4741a6','#9bbbfc','#f9ce69','#d9eff7']
            }]
        }
    });

    // ✅ Add Vote on this Poll link
    const voteLink = document.getElementById('vote-link');
    if (voteLink) {
        voteLink.href = `/poll/${pollData.id}/`;  // Django route for voting page
    }
});


    function sharePoll() {
    const button = document.getElementById("share-button");
    const pollUrl = button.getAttribute("data-url");
    const fullUrl = window.location.origin + pollUrl;

    if (navigator.share) {
        // ✅ Native share (works on mobile & modern browsers)
        navigator.share({
            title: "Vote on this poll!",
            text: "Cast your vote here:",
            url: fullUrl
        }).catch(err => console.log("Share canceled:", err));
    } else {
        // ✅ Fallback: copy link
        navigator.clipboard.writeText(fullUrl)
            .then(() => alert("Poll link copied: " + fullUrl))
            .catch(() => alert("Could not copy. Please copy manually: " + fullUrl));
    }
}
      function exportResults() {
    const pollTitle = pollData.title.replace(/\s+/g, "_");
    let csvContent = "data:text/csv;charset=utf-8,";

    // Header row
    csvContent += "Option, Votes\n";

    // Each option row
    pollData.options.forEach(opt => {
        csvContent += `${opt.text}, ${opt.votes}\n`;
    });

    // Download as CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${pollTitle}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

     function embedPoll() {
    const pollUrl = window.location.origin + `/poll/${pollData.id}/`;

    const embedCode = `<iframe src="${pollUrl}" width="600" height="400" frameborder="0"></iframe>`;

    // Copy to clipboard
    navigator.clipboard.writeText(embedCode).then(() => {
        alert("Embed code copied! Paste it into your website/blog.");
    }).catch(() => {
        alert("Could not copy embed code. Here it is:\n" + embedCode);
    });
}

    