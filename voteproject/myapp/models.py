from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Poll(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="polls")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def total_votes(self):
        return Vote.objects.filter(option__poll=self).count()

    def __str__(self):
        return self.title


class Option(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="options")
    text = models.CharField(max_length=200)

    def votes_count(self):
        return self.votes.count()

    def __str__(self):
        return f"{self.text} ({self.poll.title})"


class Vote(models.Model):
    option = models.ForeignKey(Option, on_delete=models.CASCADE, related_name="votes")
    voted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("option", "voted_by")  # prevent duplicate votes on same option

    def __str__(self):
        return f"{self.voted_by.username} → {self.option.text}"