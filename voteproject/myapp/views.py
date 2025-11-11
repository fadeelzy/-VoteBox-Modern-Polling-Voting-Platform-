from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Poll, Option, Vote
from django.http import JsonResponse
from django.core.serializers import serialize

# Create your views here.
# Landing page
def landing(request):
    # Redirect logged-in users straight to dashboard
    if request.user.is_authenticated:
        return redirect("dashboard")
    return render(request, "landing.html")


# Dashboard page
@login_required
def dashboard(request):
    if not request.user.is_authenticated:
        return redirect("landing")

    polls = Poll.objects.filter(is_active=True).order_by("-created_at")
    total_votes = 0
    for poll in polls:
        for option in poll.options.all():
            total_votes += option.votes.count()

    context = {
        "polls": polls,
        "total_votes": total_votes,
    }
    return render(request, "dashboard.html", context)

# Signup handler
def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        email = request.POST.get("email", "").strip()
        password1 = request.POST.get("password1", "").strip()
        password2 = request.POST.get("password2", "").strip()

        if not username or not email or not password1 or not password2:
            messages.error(request, "All fields are required.")
            return redirect("signup")

        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("signup")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect("signup")

        user = User.objects.create_user(username=username, email=email, password=password1)
        login(request, user)
        return redirect("dashboard")

    return render(request, "dashboard.html")


# Login handler

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "").strip()

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("dashboard")
        else:
            messages.error(request, "Invalid username or password")
            return redirect("landing")

    return redirect("landing")


# Logout handler
def logout_view(request):
    logout(request)
    messages.success(request, "Logged out successfully.")
    return redirect("landing")


def create_poll(request):
    """Handles new poll creation using poll.html template."""
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        description = request.POST.get("description", "").strip()
        options = request.POST.getlist("options")

        # Validation
        if not title:
            messages.error(request, "Poll title is required.")
            return redirect("create_poll")

        options = [o.strip() for o in options if o.strip()]
        if len(options) < 2:
            messages.error(request, "Please provide at least two options.")
            return redirect("create_poll")

        poll = Poll.objects.create(title=title, description=description, created_by=request.user)
        for opt in options:
            Option.objects.create(poll=poll, text=opt)

        messages.success(request, "Poll created successfully.")
        return redirect("dashboard")

    # GET request → show empty poll.html as form
    return render(request, "poll.html", {"creating": True})
def poll(request, poll_id):
    poll = get_object_or_404(Poll, id=poll_id)
    options = poll.options.all()

    poll_data = {
        "id": poll.id,
        "title": poll.title,
        "description": poll.description,
        "isActive": poll.is_active,
        "options": [
            {
                "id": option.id,
                "text": option.text,
                "votes": option.votes.count()
            }
            for option in options
        ],
        "totalVotes": poll.total_votes()
    }

    if request.method == "POST":
        option_id = request.POST.get("option")
        if option_id:
            option = get_object_or_404(Option, id=option_id, poll=poll)

            # Allow anonymous voting
            Vote.objects.create(
                option=option,
                voted_by=request.user if request.user.is_authenticated else None
            )

            return redirect("results", poll_id=poll.id)

    return render(request, "poll.html", {"poll_data": poll_data, "poll": poll})

def results(request, poll_id):
    poll = get_object_or_404(Poll, id=poll_id)
    options = poll.options.all()

    total_votes = sum(opt.votes.count() for opt in options)

    # prepare JSON-like dict for Chart.js
    poll_data = {
        "id": poll.id,
        "title": poll.title,
        "description": poll.description,
        "isActive": poll.is_active,
        "created_at": poll.created_at.strftime("%Y-%m-%d %H:%M"),
        "totalVotes": total_votes,
        "options": [
            {"text": opt.text, "votes": opt.votes.count()}
            for opt in options
        ],
    }

    context = {
        "poll": poll,
        "options": options,
        "total_votes": total_votes,
        "poll_data": poll_data,   # pass this for JS
    }
    return render(request, "results.html", context)
