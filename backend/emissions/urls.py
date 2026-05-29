from django.urls import path
from .views import (
    EmissionRecordListView,
    SuspiciousRecordListView
)
urlpatterns = [
    path(
        "records/",
        EmissionRecordListView.as_view(),
        name="records"
    ),
    path(
        "suspicious/",
        SuspiciousRecordListView.as_view(),
        name="suspicious-records"
    ),
]