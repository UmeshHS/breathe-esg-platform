from django.db import models
from emissions.models import EmissionRecord

class ReviewAction(models.Model):

    ACTIONS = [
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=20,
        choices=ACTIONS
    )

    reviewer = models.CharField(
        max_length=100
    )

    comments = models.TextField(
        blank=True
    )

    reviewed_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.action}"