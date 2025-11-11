// Dashboard JavaScript (Django version)

// Load and display polls (now polls will be injected by Django template or via API)
function loadPolls() {
    const pollsList = document.getElementById('polls-list');

    // If Django injects polls via template, JS might just handle empty-state
    if (!pollsList || pollsList.children.length === 0) {
        pollsList.innerHTML = `
            <div class="text-center" style="padding: 3rem;">
                <h3 class="text-xl font-bold mb-2">No polls yet</h3>
                <p style="color: var(--muted-foreground); margin-bottom: 2rem;">Create your first poll to get started</p>
                <a href="/poll/" class="btn btn-primary">Create Your First Poll</a>
            </div>
        `;
        return;
    }
}

// Share poll
function sharePoll(pollId) {
    const shareUrl = `${window.location.origin}/poll/${pollId}/`;

    if (navigator.share) {
        navigator.share({
            title: "VoteBox Poll",
            text: "Join and vote now!",
            url: shareUrl
        });
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Poll link copied to clipboard!');
        });
    }
}

// Edit poll (will redirect to edit page in Django)
function editPoll(pollId) {
    window.location.href = `/poll/${pollId}/edit/`;
}

// Add hover effects
function addPollHoverEffects() {
    const pollItems = document.querySelectorAll('.poll-item');
    
    pollItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent)';
            this.style.boxShadow = 'var(--shadow-card)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadPolls();
    setTimeout(addPollHoverEffects, 100);
});